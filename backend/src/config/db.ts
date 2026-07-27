import mongoose from "mongoose";
import { config } from "./index";
import { logger } from "../shared/utils/logger";

export const connectDB = async () => {
  try {
    if (config.mongoUri.includes("<username>")) {
      logger.warn("MONGO_URI not configured. Skipping database connection for now.");
      return;
    }
    
    await mongoose.connect(config.mongoUri);
    logger.info("✅ Connected to MongoDB Atlas");
  } catch (error: any) {
    logger.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};
