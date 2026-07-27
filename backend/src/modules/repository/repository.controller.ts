import { Request, Response } from "express";

export const importRepository = (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Repository URL is required" });
  }
  
  // Return mock stats (Later this will call Python AI Engine)
  res.json({
    name: url.split("/").pop() || "repository",
    lang: "TypeScript",
    framework: "React / Vite",
    files: 432,
    time: "~2 minutes",
  });
};
