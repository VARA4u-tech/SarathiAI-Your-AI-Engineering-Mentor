from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="CodePilot AI Engine", description="AI Orchestration layer")

class AnalyzeRequest(BaseModel):
    repo_url: str

@app.get("/")
def read_root():
    return {"status": "ok", "service": "ai-engine"}

@app.post("/ai/analyze-repo")
def analyze_repo(req: AnalyzeRequest):
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
