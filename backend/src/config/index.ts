import "dotenv/config";

export const config = {
  port: process.env.PORT || 3001,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/codepilot",
  openRouterApiKey: process.env.OPENROUTER_API_KEY || "",
  aiEngineUrl: process.env.AI_ENGINE_URL || "http://localhost:8000"
};
