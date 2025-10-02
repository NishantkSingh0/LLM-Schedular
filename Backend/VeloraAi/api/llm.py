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

def STT(buffer):
    response = model.generate_content(
        contents=[
            {
                "role": "user",
                "parts": [
                    {
                        "inline_data": {
                            "mime_type": "audio/wav",
                            "data": buffer  # raw bytes
                        }
                    }
                ]
            }
        ]
    )
    return response.text

def TTS(text: str):
    tts_model = genai.GenerativeModel("gemini-2.5-flash-preview-tts")
    response = tts_model.generate_content(
        contents=text,
        generation_config={
            "response_modalities": ["AUDIO"],
            "speech_config": {
                "voice_config": {
                    "prebuilt_voice_config": {
                        "voice_name": "Kore"
                    }
                }
            }
        }
    )

    # Get audio data
    audio_data = response.candidates[0].content.parts[0].inline_data.data
    return audio_data  # raw bytes (PCM, wrap in WAV before returning)