import { Request, Response } from "express";
import { config } from "../../config";
import { logger } from "../../shared/utils/logger";

export const runMission = async (req: Request, res: Response) => {
  const { prompt, agent_type } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // Forward the request to the Python AI Engine
    const aiResponse = await fetch(`${config.aiEngineUrl}/ai/mission`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, agent_type: agent_type || "architect" }),
    });

    if (!aiResponse.ok) {
      throw new Error(`AI Engine responded with status: ${aiResponse.status}`);
    }

    const data = await aiResponse.json();
    return res.json(data);
  } catch (error: any) {
    logger.error("Error communicating with AI Engine:", error.message);
    return res.status(500).json({ error: "Failed to connect to AI Engine", details: error.message });
  }
};
