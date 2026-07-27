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
    // Forward the request to the Python AI Engine
    const aiResponse = await fetch(`${config.aiEngineUrl}/ai/mission`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, agent_type: agent_type || "architect" }),
    });

    if (!aiResponse.ok) {
      throw new Error(`AI Engine responded with status: ${aiResponse.status}`);
    }

    const data = await aiResponse.json();
    return res.json(data);
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
      changes: [
        {
          file: "backend/src/models/user.ts",
          additions: 12,
          deletions: 2,
          diff: `@@ -10,6 +10,14 @@
 export interface IUser extends Document {
   email: string;
   passwordHash: string;
+  role: "admin" | "user" | "viewer";
 }
 
 const UserSchema: Schema = new Schema({
   email: { type: String, required: true, unique: true },
   passwordHash: { type: String, required: true },
+  role: {
+    type: String,
+    enum: ["admin", "user", "viewer"],
+    default: "user"
+  }
 });`
        },
        {
          file: "backend/src/middleware/auth.ts",
          additions: 25,
          deletions: 0,
          diff: `@@ -0,0 +1,25 @@
+import { Request, Response, NextFunction } from "express";
+
+export const requireRole = (roles: string[]) => {
+  return (req: Request, res: Response, next: NextFunction) => {
+    const user = (req as any).user;
+    
+    if (!user) {
+      return res.status(401).json({ error: "Unauthorized" });
+    }
+    
+    if (!roles.includes(user.role)) {
+      return res.status(403).json({ error: "Forbidden: insufficient permissions" });
+    }
+    
+    next();
+  };
+};`
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
