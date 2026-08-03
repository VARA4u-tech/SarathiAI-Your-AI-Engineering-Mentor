import os
import re
import json
from typing import Optional
# pyrefly: ignore [missing-import]
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Model IDs from env vars, with sensible free-tier defaults
MODELS = {
    # 120B model for heavy lifting and complex architectural reasoning
    "architect": os.getenv("AI_MODEL_ARCHITECT", "nvidia/nemotron-3-super-120b-a12b:free"),

    # 31B model for fast parsing and search retrieval
    "search": os.getenv("AI_MODEL_SEARCH", "google/gemma-4-31b-it:free"),

    # 20B model optimized for code generation
    "coder": os.getenv("AI_MODEL_CODER", "openai/gpt-oss-20b:free"),
}

# OpenRouter has a unified API identical to OpenAI
client = AsyncOpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
)


def extract_json(text: str) -> str:
    """Extract JSON from a response that may contain markdown fences or extra text."""
    # Try parsing as-is first
    try:
        json.loads(text)
        return text
    except Exception:
        pass

    # Strip ```json ... ``` or ``` ... ``` markdown fences
    fenced = re.search(r"```(?:json)?\s*(\{[\s\S]*?\})\s*```", text)
    if fenced:
        candidate = fenced.group(1)
        try:
            json.loads(candidate)
            return candidate
        except Exception:
            pass

    # Find the first { ... } block in the text
    brace_match = re.search(r"(\{[\s\S]*\})", text)
    if brace_match:
        candidate = brace_match.group(1)
        try:
            json.loads(candidate)
            return candidate
        except Exception:
            pass

    # Couldn't extract — return original for upstream error handling
    return text


async def call_agent(agent_type: str, prompt: str, project_context: Optional[str] = None) -> str:
    """Calls OpenRouter with the specific model for the requested agent."""
    model_id = MODELS.get(agent_type, "meta-llama/llama-3-8b-instruct:free")

    system_prompt = """You are a Senior AI Engineering Mentor for Sarathi.ai.
Your ONLY job is to output a single valid JSON object — nothing else. No explanations, no markdown, no code fences.

CRITICAL: Your ENTIRE response must be ONLY the JSON object below. If you write anything outside the JSON, the system will break.

Required JSON format:
{
  "score": 72,
  "categoryScores": {
    "Architecture": 7,
    "Security": 3,
    "Performance": 5,
    "Documentation": 2,
    "Testing": 1,
    "Scalability": 5,
    "Maintainability": 7
  },
  "suggestions": [
    {
      "category": "Vulnerability & Compliance",
      "title": "Add JWT Authentication",
      "description": "No authentication system is present. Any user can call all API routes.",
      "impact": "High",
      "why": "Without authentication, anyone on the internet can access, modify, or delete all data.",
      "recommendation": "Implement JWT with jsonwebtoken. Add an auth middleware that validates Bearer tokens on protected routes.",
      "difficulty": "Medium",
      "estimatedTime": "3 Hours"
    }
  ],
  "roadmap": [
    {
      "week": "Week 1",
      "title": "Authentication",
      "description": "Implement JWT-based authentication. Add login, register, and token refresh endpoints."
    }
  ]
}

Rules:
- category must be exactly one of: "System Design & Architecture", "Full Stack Implementation", "Vulnerability & Compliance", "Testing & Validation"
- impact must be: "High", "Medium", or "Low"
- difficulty must be: "Easy", "Medium", or "Hard"
- score is 0-100
- categoryScores are 1-10
- Always include at least 5 suggestions and at least 6 roadmap weeks
- If you don't have enough context, make educated guesses based on the framework and common best practices
- DO NOT ask for more information. Just produce the JSON."""

    if project_context:
        system_prompt += f"\n\nREPOSITORY CONTEXT:\n{project_context}\n\nTailor all suggestions to this specific stack."

    try:
        response = await client.chat.completions.create(
            model=model_id,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Review this project and return the JSON: {prompt}"}
            ],
            response_format={"type": "json_object"},
            extra_headers={
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Sarathi.ai",
            }
        )
        raw = response.choices[0].message.content
        return extract_json(raw)
    except Exception as e:
        return f'{{"error": "Error communicating with AI: {str(e)}"}}'
