import { Request, Response } from "express";
import { config } from "../../config";
import { logger } from "../../shared/utils/logger";
import { Mission } from "./mission.model";
import Project, { IProject } from "../project/project.model";

export const runMission = async (req: Request, res: Response) => {
  const { prompt, agent_type } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const project = await Project.findOne();
    if (!project) {
      return res.status(400).json({ error: "No projects exist. Import a repository first." });
    }

    const project_context = `
Project Name: ${project.name}
GitHub Repository: ${project.githubUrl}
Primary Language: ${project.language}
Framework: ${project.framework}
---
Project Documentation (README):
${project.readmeDocs || "No README available."}
    `.trim();

    // Forward the request to the Python AI Engine
    const aiResponse = await fetch(`${config.aiEngineUrl}/ai/mission`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        prompt, 
        agent_type: agent_type || "architect",
        project_context 
      }),
    });

    if (!aiResponse.ok) {
      throw new Error(`AI Engine responded with status: ${aiResponse.status}`);
    }

    const data = await aiResponse.json();
    let suggestions = [];
    
    // The python engine returns { "status": "success", "agent": "...", "response": "{...json string...}" }
    try {
      const parsedResponse = JSON.parse(data.response);
      suggestions = parsedResponse.suggestions || [];
    } catch (parseError) {
      logger.error("Failed to parse AI response as JSON", data.response);
      suggestions = [
        {
          category: "Architecture",
          title: "Raw Analysis",
          description: data.response || "No response generated.",
          impact: "Medium"
        }
      ];
    }



    const newMission = new Mission({
      projectId: project._id,
      title: prompt,
      description: "AI Architectural Audit based on user prompt.",
      status: "review_required",
      suggestions
    });

    await newMission.save();
    return res.json(newMission);
  } catch (error: any) {
    logger.error("Error communicating with AI Engine:", error.message);
    return res.status(500).json({ error: "Failed to connect to AI Engine", details: error.message });
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
          category: "Performance",
          title: "Implement Redis Caching",
          description: "Database queries for user roles are frequent. Implement a Redis caching layer to store role permissions, reducing DB load by up to 40%.",
          impact: "High"
        },
        {
          category: "Security",
          title: "Add API Rate Limiting",
          description: "The authentication endpoints currently lack rate limiting. Add 'express-rate-limit' to prevent brute-force login attempts.",
          impact: "High"
        },
        {
          category: "Architecture",
          title: "Standardize Error Handling",
          description: "Error responses across API routes are inconsistent. Introduce a global error handling middleware to ensure consistent JSON formats for client consumption.",
          impact: "Medium"
        },
        {
          category: "Security",
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
