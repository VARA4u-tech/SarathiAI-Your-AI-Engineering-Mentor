import express from "express";
import cors from "cors";
import { importRepository } from "./modules/repository/repository.controller";
import { getProjects, createProject } from "./modules/project/project.controller";
import { logger } from "./shared/utils/logger";
import { config } from "./config";

const app = express();

app.use(cors());
app.use(express.json());

// --- Routes ---

// Repository Module
app.post("/api/import", importRepository);

// Project Module
app.get("/api/projects", getProjects);
app.post("/api/projects", createProject);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "api-gateway" });
});

app.listen(config.port, () => {
  logger.info(`API Gateway running on http://localhost:${config.port}`);
});
