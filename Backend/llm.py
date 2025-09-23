import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

genai.configure(api_key=os.getenv("Gemini"))

model = genai.GenerativeModel("gemini-1.5-pro")

def respond(UserInput: str, SystemPrompt: str) -> str:
    # print("Input Prompt:",UserInput)
    
    
    response = model.generate_content(
        contents=[
            {
                "role": "user",
                "parts": [
                    {
                        "text": SystemPrompt
                    },
                    {"text": UserInput}
                ]
            }
        ],
        generation_config={
            "temperature": 0.4,
            "max_output_tokens": 1500
        }
    )
    print("OutputResponse:",response.text)
    return response.text