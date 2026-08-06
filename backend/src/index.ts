import "dotenv/config";
import { app } from "./app";
import { logger } from "./shared/utils/logger";
import { config } from "./config";
import { connectDB } from "./config/db";

// Start server
connectDB().then(() => {
  app.listen(config.port, () => {
    logger.info(`API Gateway running on http://localhost:${config.port}`);
  });
});
