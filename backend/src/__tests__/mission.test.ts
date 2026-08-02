import request from "supertest";
import { app } from "../app";
import { Mission } from "../modules/mission/mission.model";
import { logger } from "../shared/utils/logger";

// Mock the mongoose model and logger
jest.mock("../modules/mission/mission.model");
jest.mock("../shared/utils/logger");
jest.mock("../shared/middlewares/auth.middleware", () => ({
  requireAuth: (req: any, res: any, next: any) => {
    req.user = { id: "test-user-id" };
    next();
  }
}));

describe("Mission APIs", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("GET /api/missions", () => {
    it("should return a list of missions", async () => {
      // Setup mock data
      const mockMissions = [
        { _id: "m1", title: "Mission 1", projectId: "p1" },
        { _id: "m2", title: "Mission 2", projectId: "p2" },
      ];

      // Mock the find().sort() chain
      const mockSort = jest.fn().mockResolvedValue(mockMissions);
      (Mission.find as jest.Mock).mockReturnValue({
        sort: mockSort,
      });

      // Execute request
      const response = await request(app).get("/api/missions");

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockMissions);
      expect(Mission.find).toHaveBeenCalledWith({});
      expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
    });

    it("should filter missions by projectId if provided in query", async () => {
      const mockMissions = [{ _id: "m1", title: "Mission 1", projectId: "p1" }];
      
      const mockSort = jest.fn().mockResolvedValue(mockMissions);
      (Mission.find as jest.Mock).mockReturnValue({
        sort: mockSort,
      });

      const response = await request(app).get("/api/missions?projectId=p1");

      expect(response.status).toBe(200);
      expect(Mission.find).toHaveBeenCalledWith({ projectId: "p1" });
    });
  });

  describe("GET /api/missions/:id", () => {
    it("should return a specific mission by ID", async () => {
      const mockMission = { _id: "m1", title: "Mission 1", projectId: "p1" };

      // Mock findById().populate()
      const mockPopulate = jest.fn().mockResolvedValue(mockMission);
      (Mission.findById as jest.Mock).mockReturnValue({
        populate: mockPopulate,
      });

      const response = await request(app).get("/api/missions/m1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockMission);
      expect(Mission.findById).toHaveBeenCalledWith("m1");
      expect(mockPopulate).toHaveBeenCalledWith("projectId", "name githubUrl");
    });

    it("should return 404 if the mission is not found", async () => {
      // Mock findById().populate() to return null
      const mockPopulate = jest.fn().mockResolvedValue(null);
      (Mission.findById as jest.Mock).mockReturnValue({
        populate: mockPopulate,
      });

      const response = await request(app).get("/api/missions/m1");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Mission not found" });
    });
  });
});
