import { Request, Response } from "express";
import { logger } from "../../shared/utils/logger";
import Project from "../project/project.model";

export const importRepository = async (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Repository URL is required" });
  }
  
  try {
    // Parse GitHub URL. Expected format: https://github.com/owner/repo
    const parts = url.replace(/\/$/, "").split("/");
    const repoName = parts.pop();
    const ownerName = parts.pop();
    
    if (!repoName || !ownerName || !url.includes("github.com")) {
      return res.status(400).json({ error: "Invalid GitHub URL format. Must be https://github.com/owner/repo" });
    }

    const apiUrl = `https://api.github.com/repos/${ownerName}/${repoName}`;
    const readmeUrl = `https://api.github.com/repos/${ownerName}/${repoName}/readme`;

    // Authenticated requests get 5000 req/hour vs 60 unauthenticated
    const githubHeaders: HeadersInit = {
      Accept: "application/vnd.github+json",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    };

    // Fetch Repo Info
    const repoRes = await fetch(apiUrl, { headers: githubHeaders });
    let lang = "TypeScript";
    let desc = "";
    if (repoRes.ok) {
      const repoData = await repoRes.json();
      lang = repoData.language || "TypeScript";
      desc = repoData.description || "";
    } else {
      logger.warn(`Failed to fetch repo info for ${ownerName}/${repoName}`);
    }

    // Fetch README
    const readmeRes = await fetch(readmeUrl, { headers: githubHeaders });
    let readmeDocs = "";
    if (readmeRes.ok) {
      const readmeData = await readmeRes.json();
      if (readmeData.content) {
        readmeDocs = Buffer.from(readmeData.content, 'base64').toString('utf-8');
      }
    } else {
      logger.warn(`Failed to fetch README for ${ownerName}/${repoName}`);
    }

    // Create or Update Project
    let project = await Project.findOne({ githubUrl: url });
    
    if (project) {
      project.readmeDocs = readmeDocs;
      project.language = lang;
      project.status = "ready";
      await project.save();
    } else {
      project = new Project({
        name: repoName,
        githubUrl: url,
        language: lang,
        framework: "Unknown", // Can be updated by AI later
        readmeDocs,
        status: "ready"
      });
      await project.save();
    }

    return res.json(project);
  } catch (error: any) {
    logger.error("Failed to import repository:", error.message);
    return res.status(500).json({ error: "Failed to import repository" });
  }
};
