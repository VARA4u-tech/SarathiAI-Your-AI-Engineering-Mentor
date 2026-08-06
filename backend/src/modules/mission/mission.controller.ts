import { Request, Response } from "express";
import { config } from "../../config";
import { logger } from "../../shared/utils/logger";
import { Mission } from "./mission.model";
import Project, { IProject } from "../project/project.model";

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

    const project_context = `
Project Name: ${project.name}
GitHub Repository: ${project.githubUrl}
Primary Language: ${project.language}
Framework: ${project.framework}

--- README.md Content ---
${project.readmeDocs ? project.readmeDocs.substring(0, 8000) : "No README provided."}
    `.trim();

    const systemPrompt = `You are a Senior AI Engineering Mentor for Sarathi.ai.
Your ONLY job is to output a single valid JSON object — nothing else. No explanations, no markdown, no code fences.

CRITICAL: Your ENTIRE response must be ONLY the JSON object below. If you write anything outside the JSON, the system will break.

Required JSON format:
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
  },
  "suggestions": [
    {
      "category": "Vulnerability & Compliance",
      "title": "Add JWT Authentication",
      "description": "No authentication system is present. Any user can call all API routes.",
      "impact": "High",
      "why": "Without authentication, anyone on the internet can access, modify, or delete all data.",
      "recommendation": "Implement JWT with jsonwebtoken. Add an auth middleware that validates Bearer tokens on protected routes.",
      "difficulty": "Medium",
      "estimatedTime": "3 Hours"
    }
  ],
  "roadmap": [
    {
      "week": "Week 1",
      "title": "Authentication",
      "description": "Implement JWT-based authentication. Add login, register, and token refresh endpoints."
    }
  ]
}

Rules:
- category must be exactly one of: "System Design & Architecture", "Full Stack Implementation", "Vulnerability & Compliance", "Testing & Validation"
- impact must be: "High", "Medium", or "Low"
- difficulty must be: "Easy", "Medium", or "Hard"
- score is 0-100
- categoryScores are 1-10
- Always include at least 5 suggestions and at least 6 roadmap weeks
- If you don't have enough context, make educated guesses based on the framework and common best practices
- DO NOT ask for more information. Just produce the JSON.

REPOSITORY CONTEXT:
${project_context}

Tailor all suggestions to this specific stack.`;
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

    // Process the AI call in the background
    (async () => {
      try {
        const modelId = process.env.AI_MODEL_ARCHITECT || "openai/gpt-oss-20b:free";

        // Call OpenRouter directly, bypassing the separate Python AI Engine
        const openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:5173",
            "X-Title": "Sarathi.ai",
          },
          body: JSON.stringify({
            model: modelId,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: `Review this project and return the JSON: ${prompt}` }
            ]
          }),
        });

        if (!openRouterRes.ok) {
          throw new Error(`OpenRouter responded with status: ${openRouterRes.status}`);
        }

        const openRouterData = await openRouterRes.json();
        const rawResponse = openRouterData.choices[0].message.content;
        
        // Extract JSON in case of markdown fences
        let jsonString = rawResponse;
        const jsonMatch = rawResponse.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
        if (jsonMatch) {
          jsonString = jsonMatch[1];
        } else {
          const braceMatch = rawResponse.match(/(\{[\s\S]*\})/);
          if (braceMatch) {
            jsonString = braceMatch[1];
          }
        }

        let suggestions = [];
        let score = 0;
        let categoryScores = {
          Architecture: 0, Security: 0, Performance: 0, Documentation: 0, Testing: 0, Scalability: 0, Maintainability: 0
        };
        let roadmap = [];
        
        try {
          const parsedResponse = JSON.parse(jsonString);
          suggestions = parsedResponse.suggestions || [];
          score = parsedResponse.score || 0;
          if (parsedResponse.categoryScores) {
            categoryScores = { ...categoryScores, ...parsedResponse.categoryScores };
          }
          roadmap = parsedResponse.roadmap || [];
        } catch (parseError) {
          logger.error("Failed to parse AI response as JSON", jsonString);
          suggestions = [
            {
              category: "System Design & Architecture",
              title: "Analysis Failed or Raw Response",
              description: jsonString || "No response generated.",
              impact: "Medium",
              why: "The AI engine failed to generate a structured JSON response. It likely needs more codebase context or reached a rate limit.",
              recommendation: "Please try running the review again or check the AI provider logs.",
              difficulty: "Medium",
              estimatedTime: "N/A"
            }
          ];
        }

        // Update the mission in DB
        newMission.status = "review_required";
        newMission.score = score;
        newMission.categoryScores = categoryScores;
        newMission.roadmap = roadmap;
        newMission.suggestions = suggestions;
        await newMission.save();
        
      } catch (backgroundError: any) {
        logger.error("Background AI generation failed:", backgroundError.message);
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
