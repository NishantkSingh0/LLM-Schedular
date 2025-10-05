from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
import pdfplumber
from io import BytesIO
from django.http import FileResponse

# Wakeup endpoint
@api_view(['GET'])
def wakeup(request):
    print("Wakeup ping received — server is alive!")
    return Response(status=204)  # No content, returns instantly

# ParseResumes endpoint
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def ParseResumes(request):
    print("Request made (ParseResumes)")
    file = request.FILES.get("Resume")
    if not file:
        return Response({"error": "No file provided"}, status=400)
    try:
        # Read PDF content directly from memory
        pdf_bytes = BytesIO(file.read())
        text = ""
        with pdfplumber.open(pdf_bytes) as pdf:
            for page in pdf.pages:
                text += page.extract_text() or ""
        print("Resume parsed successfully")
        return Response({"parsed_text": text})
    except Exception as e:
        print("Error parsing resume:", e)
        return Response({"error": str(e)}, status=500)

# TTS endpoint
@api_view(['POST'])
def tts(request):
    text = request.data.get("text")
    print("Request made (TTS)")

    with open("static/InterviewSchedular.wav", "rb") as f:
        audio_bytes = f.read()
    print("Audio readed successfully")
    audio_buffer = BytesIO(audio_bytes)
    return FileResponse(audio_buffer, as_attachment=False, filename="tts.wav", content_type='audio/wav')

# STT endpoint
@api_view(['POST'])
def stt(request):
    if 'file' not in request.FILES:
        return Response({"error": "No file uploaded"}, status=400)

    file = request.FILES['file']
    audio_buffer = BytesIO(file.read())
    return Response({"transcription": "Rendered audio successfully"})

# Qns endpoint
@api_view(['POST'])
def generate_questions(request):
    data = request.data
    org_need = data.get('orgNeed')
    position_level = data.get('positionLevel')

    questions = [
        f"What is your experience related to {org_need}?",
        f"How do you handle challenges at {position_level} level?",
        "Describe a project you are proud of.",
        "What technologies do you prefer for high traffic backend?",
        "How do you keep yourself updated?"
    ]

    return Response({"questions": questions})
