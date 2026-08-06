import { Request, Response } from "express";
import Project from "./project.model";
import { logger } from "../../shared/utils/logger";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return res.json(projects);
  } catch (error: any) {
    logger.error("Failed to fetch projects:", error.message);
    return res.status(500).json({ error: "Failed to fetch projects" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, githubUrl, language, framework } = req.body;

    if (!githubUrl) {
      return res.status(400).json({ error: "githubUrl is required" });
    }

    // Check if project already exists
    let project = await Project.findOne({ githubUrl });
    
    if (project) {
      // Update existing
      project.status = "ready";
      await project.save();
    } else {
      // Create new
      project = new Project({
        name: name || githubUrl.split("/").pop(),
        githubUrl,
        language: language || "TypeScript",
        framework: framework || "React",
        status: "ready"
      });
      await project.save();
    }

    return res.status(201).json(project);
  } catch (error: any) {
    logger.error("Failed to create project:", error.message);
    return res.status(500).json({ error: "Failed to create project" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Note: We might also want to delete associated missions here later, 
    // but MongoDB doesn't enforce cascading deletes natively without pre-hooks.
    
    return res.json({ message: "Project deleted successfully", id });
  } catch (error: any) {
    logger.error("Failed to delete project:", error.message);
    return res.status(500).json({ error: "Failed to delete project" });
  }
};

