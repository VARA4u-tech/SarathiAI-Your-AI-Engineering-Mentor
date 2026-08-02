import express from "express";
import cors from "cors";
import { getProjects, createProject } from "./modules/project/project.controller";
import { importRepository } from "./modules/repository/repository.controller";
import { runMission, getMissions, getMissionById, updateMissionStatus, createMockMission, deleteMission } from "./modules/mission/mission.controller";
import authRoutes from "./modules/auth/auth.routes";
import { requireAuth } from "./shared/middlewares/auth.middleware";

export const app = express();

app.use(cors());
app.use(express.json());

// --- Routes ---

// Auth Module
app.use("/api/auth", authRoutes);

// Repository Module
app.post("/api/import", requireAuth, importRepository);

// Project Module
app.get("/api/projects", requireAuth, getProjects);
app.post("/api/projects", requireAuth, createProject);

// AI Mission Module
app.get("/api/missions", requireAuth, getMissions);
app.post("/api/missions/mock", requireAuth, createMockMission);
app.get("/api/missions/:id", requireAuth, getMissionById);
app.put("/api/missions/:id/status", requireAuth, updateMissionStatus);
app.delete("/api/missions/:id", requireAuth, deleteMission);
app.post("/api/missions", requireAuth, runMission);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "api-gateway" });
});
