import { Request, Response } from "express";

export const getProjects = (req: Request, res: Response) => {
  res.json({ message: "List of projects (stub)" });
};

export const createProject = (req: Request, res: Response) => {
  res.json({ message: "Project created (stub)" });
};
