import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// --- Mock Endpoints for Demo UI ---

// Simulate Repository Indexing
app.post("/api/import", (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Repository URL is required" });
  }
  
  // Return mock stats
  res.json({
    name: url.split("/").pop() || "repository",
    lang: "TypeScript",
    framework: "React / Vite",
    files: 432,
    time: "~2 minutes",
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "api-gateway" });
});

app.listen(PORT, () => {
  console.log(`[Backend] API Gateway running on http://localhost:${PORT}`);
});
