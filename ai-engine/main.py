from typing import Optional
from fastapi import FastAPI
from pydantic import BaseModel
from utils.openrouter import call_agent

app = FastAPI(title="CodePilot AI Engine", description="AI Orchestration layer")

class AnalyzeRequest(BaseModel):
    repo_url: str

@app.get("/")
async def read_root():
    return {"status": "ok", "service": "ai-engine"}

@app.post("/ai/analyze-repo")
async def analyze_repo(req: AnalyzeRequest):
    # Mock AI analysis behavior
    return {
        "status": "success",
        "message": f"Successfully analyzed {req.repo_url}",
        "insights": [
            "Detected Express backend architecture",
            "Found React frontend in /frontend",
            "Authentication relies on JWT in headers"
        ]
    }

class MissionRequest(BaseModel):
    prompt: str
    agent_type: str = "architect"
    project_context: Optional[str] = None

@app.post("/ai/mission")
async def run_mission(req: MissionRequest):
    result = await call_agent(req.agent_type, req.prompt, req.project_context)
    return {
        "status": "success",
        "agent": req.agent_type,
        "response": result
    }
