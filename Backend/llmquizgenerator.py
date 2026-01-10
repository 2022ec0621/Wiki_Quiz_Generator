import json
import os
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate


load_dotenv()

# ✅ Initialize LangChain Gemini model
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0.3,
    google_api_key=os.getenv("GEMINI_API_KEY"),
)

# ✅ LangChain PromptTemplate
QUIZ_PROMPT = PromptTemplate(
    input_variables=["text", "difficulty"],
    template="""
You are an expert quiz generator.

Generate 5 multiple-choice questions from the text below.
Difficulty level: {difficulty}

Rules:
- Each question must have 4 options
- Randomize the correct answer position (NOT always A)
- Provide the correct option letter (A/B/C/D)
- Return ONLY valid JSON
- No explanations
- No markdown

JSON format:
{{
  "quiz": [
    {{
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "answer": "A/B/C/D"
    }}
  ]
}}

Text:
{text}
"""
)


def generate_quiz_from_text(text: str, difficulty: str) -> dict:
    try:
        chain = QUIZ_PROMPT | llm
        response = chain.invoke({
            "text": text,
            "difficulty": difficulty,
            
        })

        raw_output = response.content.strip()

        # 🧹 Clean possible code fences
        if raw_output.startswith("```"):
            raw_output = raw_output.strip("```").replace("json", "").strip()

        parsed = json.loads(raw_output)

        # Safety check
        if "quiz" not in parsed or not isinstance(parsed["quiz"], list):
            return {
                "quiz": [],
                "error": "Invalid quiz format returned by AI"
            }

        return parsed

    except Exception as e:
        return {
            "quiz": [],
            "error": str(e)
        }
