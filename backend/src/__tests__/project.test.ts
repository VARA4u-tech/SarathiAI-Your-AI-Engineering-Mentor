import request from "supertest";
import { app } from "../app";
import Project from "../modules/project/project.model";
import { logger } from "../shared/utils/logger";

// Mock the mongoose model and logger
jest.mock("../modules/project/project.model");
jest.mock("../shared/utils/logger");
jest.mock("../shared/middlewares/auth.middleware", () => ({
  requireAuth: (req: any, res: any, next: any) => {
    req.user = { id: "test-user-id" };
    next();
  }
}));

describe("Project APIs", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("GET /api/projects", () => {
    it("should return a list of projects", async () => {
      // Setup mock data
      const mockProjects = [
        { _id: "1", name: "Test Project A", githubUrl: "https://github.com/test/a" },
        { _id: "2", name: "Test Project B", githubUrl: "https://github.com/test/b" },
      ];

      // Mock the find().sort() chain
      const mockSort = jest.fn().mockResolvedValue(mockProjects);
      (Project.find as jest.Mock).mockReturnValue({
        sort: mockSort,
      });

      // Execute request
      const response = await request(app).get("/api/projects");

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProjects);
      expect(Project.find).toHaveBeenCalledTimes(1);
      expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
    });

    it("should return a 500 error if the database query fails", async () => {
      // Mock the find().sort() chain to throw an error
      const mockSort = jest.fn().mockRejectedValue(new Error("Database error"));
      (Project.find as jest.Mock).mockReturnValue({
        sort: mockSort,
      });

      // Execute request
      const response = await request(app).get("/api/projects");

      // Assertions
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to fetch projects" });
    });
  });
});
