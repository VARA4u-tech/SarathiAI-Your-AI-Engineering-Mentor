import { Request, Response } from "express";
import { config } from "../../config";
import { logger } from "../../shared/utils/logger";
import { Mission, IMission } from "./mission.model";
import Project, { IProject } from "../project/project.model";

type ISuggestion = IMission["suggestions"][number];
type IRoadmapItem = IMission["roadmap"][number];

export const runMission = async (req: Request, res: Response) => {
  const { prompt, agent_type, projectId, title } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    let project;
    if (projectId) {
      project = await Project.findById(projectId);
    } else {
      project = await Project.findOne().sort({ createdAt: -1 });
    }

    if (!project) {
      return res.status(400).json({ error: "No projects exist. Import a repository first." });
    }

    // Guard: prevent duplicate reviews if one is already in progress
    const existingInProgress = await Mission.findOne({
      projectId: project._id,
      status: "in_progress",
    });
    if (existingInProgress) {
      return res.status(409).json({
        error: "A review is already in progress for this project. Please wait for it to complete.",
        missionId: existingInProgress._id,
      });
    }

    const project_context = `
Project Name: ${project.name}
GitHub Repository: ${project.githubUrl}
Primary Language: ${project.language}
Framework: ${project.framework}

--- README.md Content ---
${project.readmeDocs ? project.readmeDocs.substring(0, 8000) : "No README provided."}
    `.trim();

    const missionTitle = title || (prompt.length > 50 ? prompt.substring(0, 47) + "..." : prompt);

    // Create the mission immediately with in_progress status
    const newMission = new Mission({
      projectId: project._id,
      title: missionTitle,
      description: "AI Engineering Mentor Project Review.",
      status: "in_progress",
      score: 0,
      categoryScores: {
        Architecture: 0, Security: 0, Performance: 0, Documentation: 0, Testing: 0, Scalability: 0, Maintainability: 0
      },
      roadmap: [],
      suggestions: []
    });

    await newMission.save();
    
    // Return early to the client
    res.json(newMission);

    // Process the AI call in the background using a 3-stage multi-model pipeline
    (async () => {
      try {
        const OPENROUTER_HEADERS = {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:5173",
          "X-Title": "Sarathi.ai",
        };

        const callOpenRouter = async (model: string, messages: object[]): Promise<string> => {
          const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: OPENROUTER_HEADERS,
            body: JSON.stringify({ model, messages }),
          });
          if (!res.ok) {
            throw new Error(`OpenRouter [${model}] responded with status: ${res.status}`);
          }
          const data = await res.json();
          return data.choices[0].message.content;
        };

        const extractJson = (raw: string): string => {
          const fenceMatch = raw.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
          if (fenceMatch) return fenceMatch[1];
          const braceMatch = raw.match(/(\{[\s\S]*\})/);
          if (braceMatch) return braceMatch[1];
          return raw;
        };

        const stage1Model = process.env.AI_MODEL_STAGE1 || "nvidia/nemotron-nano-9b-v2:free";
        const stage2Model = process.env.AI_MODEL_STAGE2 || "google/gemma-4-31b-it:free";
        const stage3Model = process.env.AI_MODEL_STAGE3 || "openai/gpt-oss-20b:free";

        let score = 0;
        let categoryScores = {
          Architecture: 0, Security: 0, Performance: 0, Documentation: 0,
          Testing: 0, Scalability: 0, Maintainability: 0
        };
        let suggestions: ISuggestion[] = [];
        let roadmap: IRoadmapItem[] = [];

        // ─── STAGE 1: Analysis & Scoring ──────────────────────────────────────
        logger.info(`[Stage 1] Analyzing codebase with model: ${stage1Model}`);
        try {
          const stage1Prompt = `You are a senior software engineer. Analyze the following project and return ONLY a JSON object with the score and category scores.

Required format (return ONLY this JSON, no markdown, no explanation):
{
  "score": 72,
  "categoryScores": {
    "Architecture": 7,
    "Security": 3,
    "Performance": 5,
    "Documentation": 2,
    "Testing": 1,
    "Scalability": 5,
    "Maintainability": 7
  }
}

Rules:
- score is 0-100
- categoryScores values are 1-10
- Be honest and critical

PROJECT CONTEXT:
${project_context}`;

          const raw1 = await callOpenRouter(stage1Model, [
            { role: "system", content: "You output only valid JSON. No markdown, no explanation." },
            { role: "user", content: stage1Prompt },
          ]);
          const parsed1 = JSON.parse(extractJson(raw1));
          score = parsed1.score || 0;
          if (parsed1.categoryScores) {
            categoryScores = { ...categoryScores, ...parsed1.categoryScores };
          }
          // Save partial Stage 1 results immediately
          newMission.score = score;
          newMission.categoryScores = categoryScores;
          await newMission.save();
          logger.info(`[Stage 1] Complete. Score: ${score}/100`);
        } catch (e: any) {
          logger.error("[Stage 1] Failed:", e.message);
        }

        // ─── STAGE 2: Suggestions Generation ──────────────────────────────────
        logger.info(`[Stage 2] Generating suggestions with model: ${stage2Model}`);
        try {
          const stage2Prompt = `You are a senior software engineer. Based on the project below (overall score: ${score}/100), generate actionable improvement suggestions.

Return ONLY a JSON object in this exact format:
{
  "suggestions": [
    {
      "category": "Vulnerability & Compliance",
      "title": "Add JWT Authentication",
      "description": "No authentication system is present.",
      "impact": "High",
      "why": "Without auth, anyone can access all API routes.",
      "recommendation": "Implement JWT with jsonwebtoken.",
      "difficulty": "Medium",
      "estimatedTime": "3 Hours"
    }
  ]
}

Rules:
- category must be one of: "System Design & Architecture", "Full Stack Implementation", "Vulnerability & Compliance", "Testing & Validation"
- impact: "High", "Medium", or "Low"
- difficulty: "Easy", "Medium", or "Hard"
- Include at least 5 suggestions
- No markdown, no explanation, only JSON

PROJECT CONTEXT:
${project_context}`;

          const raw2 = await callOpenRouter(stage2Model, [
            { role: "system", content: "You output only valid JSON. No markdown, no explanation." },
            { role: "user", content: stage2Prompt },
          ]);
          const parsed2 = JSON.parse(extractJson(raw2));
          suggestions = parsed2.suggestions || [];
          // Save partial Stage 2 results immediately
          newMission.suggestions = suggestions;
          await newMission.save();
          logger.info(`[Stage 2] Complete. Generated ${suggestions.length} suggestions.`);
        } catch (e: any) {
          logger.error("[Stage 2] Failed:", e.message);
        }

        // ─── STAGE 3: Roadmap Generation ──────────────────────────────────────
        logger.info(`[Stage 3] Building roadmap with model: ${stage3Model}`);
        try {
          const suggestionsSummary = suggestions
            .slice(0, 5)
            .map((s: any) => `- ${s.title}: ${s.description}`)
            .join("\n");

          const stage3Prompt = `You are a senior software engineer. Based on the issues below, create a 6-week learning roadmap for the developer to fix them.

Issues to address:
${suggestionsSummary || "General improvement needed across architecture, security, and testing."}

Return ONLY a JSON object in this exact format:
{
  "roadmap": [
    {
      "week": "Week 1",
      "title": "Authentication",
      "description": "Implement JWT-based authentication with login and register endpoints."
    }
  ]
}

Rules:
- Include exactly 6 weeks
- Each week should be actionable and build on the previous
- No markdown, no explanation, only JSON`;

          const raw3 = await callOpenRouter(stage3Model, [
            { role: "system", content: "You output only valid JSON. No markdown, no explanation." },
            { role: "user", content: stage3Prompt },
          ]);
          const parsed3 = JSON.parse(extractJson(raw3));
          roadmap = parsed3.roadmap || [];
          logger.info(`[Stage 3] Complete. Built ${roadmap.length}-week roadmap.`);
        } catch (e: any) {
          logger.error("[Stage 3] Failed:", e.message);
        }

        // ─── FINAL: Save completed mission ────────────────────────────────────
        newMission.status = "review_required";
        newMission.score = score;
        newMission.categoryScores = categoryScores;
        newMission.suggestions = suggestions;
        newMission.roadmap = roadmap;
        await newMission.save();
        logger.info("[Pipeline] All stages complete. Mission saved.");

      } catch (backgroundError: any) {
        logger.error("Background AI pipeline failed:", backgroundError.message);
        newMission.status = "review_required";
        newMission.suggestions = [
          {
            category: "System Design & Architecture",
            title: "Analysis Failed",
            description: `Error: ${backgroundError.message}`,
            impact: "Medium",
            why: "An error occurred while communicating with the AI Engine or OpenRouter.",
            recommendation: "Please check your API keys and try again.",
            difficulty: "Medium",
            estimatedTime: "N/A"
          }
        ];
        await newMission.save();
      }
    })();

    
  } catch (error: any) {
    logger.error("Error setting up mission:", error.message);
    if (!res.headersSent) {
      return res.status(500).json({ error: "Failed to create mission", details: error.message });
    }
  }
};

export const getMissions = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.query;
    const filter = projectId ? { projectId } : {};
    const missions = await Mission.find(filter).sort({ createdAt: -1 });
    return res.json(missions);
  } catch (error: any) {
    logger.error("Error fetching missions:", error.message);
    return res.status(500).json({ error: "Failed to fetch missions" });
  }
};

export const getMissionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mission = await Mission.findById(id).populate("projectId", "name githubUrl");
    if (!mission) {
      return res.status(404).json({ error: "Mission not found" });
    }
    return res.json(mission);
  } catch (error: any) {
    logger.error("Error fetching mission by ID:", error.message);
    return res.status(500).json({ error: "Failed to fetch mission" });
  }
};

export const updateMissionStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!["pending", "in_progress", "review_required", "approved", "rejected", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const mission = await Mission.findByIdAndUpdate(id, { status }, { new: true });
    if (!mission) {
      return res.status(404).json({ error: "Mission not found" });
    }
    return res.json(mission);
  } catch (error: any) {
    logger.error("Error updating mission status:", error.message);
    return res.status(500).json({ error: "Failed to update mission status" });
  }
};

export const createMockMission = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne();
    if (!project) {
      return res.status(400).json({ error: "No projects exist. Import a repository first." });
    }

    const mockMission = new Mission({
      projectId: project._id,
      title: "Add role-based authentication",
      description: "Implemented a robust role-based access control (RBAC) system. The AI has modified the user model and added middleware to protect API routes.",
      status: "review_required",
      suggestions: [
        {
          category: "Vulnerability & Compliance",
          title: "Implement Redis Caching",
          description: "Database queries for user roles are frequent. Implement a Redis caching layer to store role permissions, reducing DB load by up to 40%.",
          impact: "High"
        },
        {
          category: "Vulnerability & Compliance",
          title: "Add API Rate Limiting",
          description: "The authentication endpoints currently lack rate limiting. Add 'express-rate-limit' to prevent brute-force login attempts.",
          impact: "High"
        },
        {
          category: "System Design & Architecture",
          title: "Standardize Error Handling",
          description: "Error responses across API routes are inconsistent. Introduce a global error handling middleware to ensure consistent JSON formats for client consumption.",
          impact: "Medium"
        },
        {
          category: "Vulnerability & Compliance",
          title: "Configure Strict CORS policy",
          description: "Current CORS setup allows all origins in development. Restrict the origins to explicitly authorized frontend domains before deploying to production.",
          impact: "High"
        }
      ]
    });

    await mockMission.save();
    return res.status(201).json(mockMission);
  } catch (error: any) {
    logger.error("Error creating mock mission:", error.message);
    return res.status(500).json({ error: "Failed to create mock mission" });
  }
};

export const deleteMission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mission = await Mission.findByIdAndDelete(id);
    if (!mission) {
      return res.status(404).json({ error: "Mission not found" });
    }
    return res.json({ success: true, message: "Mission deleted" });
  } catch (error: any) {
    logger.error("Error deleting mission:", error.message);
    return res.status(500).json({ error: "Failed to delete mission" });
  }
};
