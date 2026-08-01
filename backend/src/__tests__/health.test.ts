import request from "supertest";
import { app } from "../app";

describe("Health Check API", () => {
  it("should return a 200 OK status and correct JSON response", async () => {
    const response = await request(app).get("/api/health");
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
      service: "api-gateway"
    });
  });
});
