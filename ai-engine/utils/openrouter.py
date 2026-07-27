import os
# pyrefly: ignore [missing-import]
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# OpenRouter has a unified API identical to OpenAI
client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key=OPENROUTER_API_KEY,
)

# Defined Free Models for our Agents
MODELS = {
    # 120B model for heavy lifting and complex architectural reasoning
    "architect": "nvidia/nemotron-3-super-120b-a12b:free", 
    
    # 31B model for fast parsing and search retrieval
    "search": "google/gemma-4-31b-it:free",                
    
    # 20B model optimized for code generation
    "coder": "openai/gpt-oss-20b:free",      
}

def call_agent(agent_type: str, prompt: str, project_context: str = None) -> str:
    """Calls OpenRouter with the specific model for the requested agent."""
    model_id = MODELS.get(agent_type, "meta-llama/llama-3-8b-instruct:free")
    
    system_prompt = (
        "You are a Senior AI Engineering Mentor for CodePilot AI. "
        "Your job is to review student or junior developer projects and provide a comprehensive 'Production-Ready Review'. "
        "You do not write code for them; you guide them on Architecture, Security, Performance, and Best Practices. "
        "You must respond ONLY with a strict JSON object containing the following keys:\n"
        "1. 'score': An integer from 0 to 100 representing the overall repository score.\n"
        "2. 'categoryScores': An object with integer scores (1-10) for 'Architecture', 'Security', 'Performance', 'Documentation', 'Testing', 'Scalability', 'Maintainability'.\n"
        "3. 'suggestions': An array of missing features or improvements. Each object must have: "
        "'category' (Strictly one of: 'System Design & Architecture', 'Full Stack Implementation', 'Vulnerability & Compliance', 'Testing & Validation'), "
        "'title' (e.g. 'Add Redis Cache'), 'description' (Detailed explanation), 'impact' ('High'|'Medium'|'Low'), "
        "'why' (Why is this important?), 'recommendation' (How to fix it), 'difficulty' ('Easy'|'Medium'|'Hard'), 'estimatedTime' (e.g. '20 Minutes').\n"
        "4. 'roadmap': An array representing a week-by-week learning/implementation plan. Each object must have: 'week' (e.g. 'Week 1'), 'title' (e.g. 'Authentication'), 'description' (What to do that week)."
    )

    if project_context:
        system_prompt += f"\n\nHere is the REPOSITORY CONTEXT for the codebase you are auditing:\n{project_context}\n\nPlease tailor your architectural and security suggestions to this specific technology stack and architecture."

    try:
        response = client.chat.completions.create(
            model=model_id,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"},
            extra_headers={
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "CodePilot AI",
            }
        )
        return response.choices[0].message.content
    except Exception as e:
        return f'{{"error": "Error communicating with AI: {str(e)}"}}'
