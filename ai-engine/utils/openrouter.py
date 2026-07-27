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

def call_agent(agent_type: str, prompt: str) -> str:
    """Calls OpenRouter with the specific model for the requested agent."""
    model_id = MODELS.get(agent_type, "meta-llama/llama-3-8b-instruct:free")
    
    system_prompt = (
        "You are a Principal Systems Architect & Security Auditor for CodePilot AI. "
        "Analyze the provided code or request and provide high-level, actionable suggestions "
        "(e.g., adding Redis, CORS, rate limiting, logging, etc.). "
        "You must respond ONLY with a strict JSON object containing a 'suggestions' array. "
        "Each object in the array must match this schema: "
        '{"category": "Security" | "Performance" | "Architecture" | "Best Practices", '
        '"title": "Short title", "description": "Detailed explanation and actionable advice", "impact": "High" | "Medium" | "Low"}'
    )

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
