import express from "express";
import cors from "cors";
import { getProjects, createProject } from "./modules/project/project.controller";
import { importRepository } from "./modules/repository/repository.controller";
import { runMission, getMissions, getMissionById, updateMissionStatus, createMockMission, deleteMission } from "./modules/mission/mission.controller";

export const app = express();

app.use(cors());
app.use(express.json());

// --- Routes ---

// Repository Module
app.post("/api/import", importRepository);

// Project Module
app.get("/api/projects", getProjects);
app.post("/api/projects", createProject);

// AI Mission Module
app.get("/api/missions", getMissions);
app.post("/api/missions/mock", createMockMission);
app.get("/api/missions/:id", getMissionById);
app.put("/api/missions/:id/status", updateMissionStatus);
app.delete("/api/missions/:id", deleteMission);
app.post("/api/missions", runMission);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "api-gateway" });
});
