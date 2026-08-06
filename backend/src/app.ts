import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { getProjects, createProject } from "./modules/project/project.controller";
import { importRepository } from "./modules/repository/repository.controller";
import { runMission, getMissions, getMissionById, updateMissionStatus, createMockMission, deleteMission } from "./modules/mission/mission.controller";
import authRoutes from "./modules/auth/auth.routes";
import { requireAuth } from "./shared/middlewares/auth.middleware";

export const app = express();

// --- Security Middleware ---

// Adds secure HTTP headers (X-Content-Type-Options, Strict-Transport-Security, etc.)
app.use(helmet());

// Allow one or more frontend origins (comma-separated in FRONTEND_URL env var)
const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Required for cookie-based auth
}));

app.use(express.json());

// --- Rate Limiters ---

// Auth endpoints: stricter — 20 attempts per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

// AI mission endpoints: 5 reviews per minute per IP (expensive LLM calls)
const missionLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many AI review requests. Please wait a moment." },
});

// --- Routes ---

// Auth Module
app.use("/api/auth", authLimiter, authRoutes);

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
app.post("/api/missions", requireAuth, missionLimiter, runMission);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "api-gateway" });
});
