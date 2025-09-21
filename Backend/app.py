from flask import Flask, request, send_file, jsonify, Response
from flask_cors import CORS
from io import BytesIO

app = Flask(__name__)
CORS(app)  

@app.route('/wakeup', methods=['GET'])
def wakeup():
    print("Wakeup ping received — server is alive!")
    return Response(status=204)  # No content, returns instantly

@app.route('/tts', methods=['POST'])
def send_audio():
    text = request.json.get("text")
    print('request maded')
    
    # Generate TTS dynamically and keep it in memory (example using static content)
    with open("InterviewSchedular.wav", "rb") as f:
        audio_bytes = f.read()

    # Wrap in BytesIO (simulate in-memory buffer)
    audio_buffer = BytesIO(audio_bytes)

    return send_file(
        audio_buffer,
        mimetype="audio/wav",
        as_attachment=False,
        download_name="tts.wav"
    )


@app.route("/stt", methods=["POST"])
def stt():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    audio_buffer = BytesIO(file.read())  # Convert to BytesIO
    return jsonify({"transcription": "Rendered audio successfully"})
    # try:
        # transcription = perform_stt(audio_buffer)
    #     return jsonify({"transcription": transcription})
    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500


@app.route('/qns', methods=['POST'])
def generate_questions():
    data = request.get_json()
    org_need = data.get('orgNeed')
    position_level = data.get('positionLevel')

    # Example response - Replace with real logic
    questions = [
        f"What is your experience related to {org_need}?",
        f"How do you handle challenges at {position_level} level?",
        "Describe a project you are proud of.",
        "What technologies do you prefer for high traffic backend?",
        "How do you keep yourself updated?"
    ]

    return jsonify({"questions": questions})


if __name__ == '__main__':
    app.run(debug=True)
