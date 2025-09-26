import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const PreInterviewCheck = () => {
  const [cameraVerified, setCameraVerified] = useState(false);
  const [micVerified, setMicVerified] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  // Camera verification on load
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraVerified(true);
      })
      .catch((err) => {
        console.error("Camera error:", err);
        setError("Camera not detected");
        setCameraVerified(false);
      });
  }, []);

  // Microphone verification
  const verifyMic = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const audioContext =
        new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(audioStream);
      source.connect(analyser);
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      let detected = false;

      const checkMic = () => {
        analyser.getByteFrequencyData(dataArray);
        const volume = dataArray.reduce((a, b) => a + b) / bufferLength;
        if (volume > 5) {
          // simple threshold
          detected = true;
          setMicVerified(true);
          audioStream.getTracks().forEach((track) => track.stop());
        } else if (!detected) {
          requestAnimationFrame(checkMic);
        }
      };

      checkMic();
    } catch (err) {
      console.error("Microphone error:", err);
      setError("Microphone not detected");
      setMicVerified(false);
    }
  };

  // Start Interview handler
  const handleStartInterview = () => {
    navigate("/Interview")
    // if (cameraVerified && micVerified) {
    //   navigate("/interview", { state: { stream: streamRef.current } });
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-6">
      {/* <h1 className="text-2xl font-bold text-gray-200 mb-4">Pre-Interview Check</h1> */}

      <div className="flex flex-col lg:flex-row bg-gray-800 shadow-blue-700 border-b-gray-950 text-amber-50 shadow-lg rounded-lg w-full max-w-6xl overflow-hidden">
        {/* Left Section: Camera & Mic Test */}
        <div className="w-full lg:w-[40%] p-6 space-y-6 ">
          {/* Camera Test */}
          <div>
            <h2 className="text-lg text-gray-200 font-semibold">Camera Test</h2>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-48 rounded-md border mt-2"
            />
            <p className="mt-2">
              {cameraVerified ? "✅ Camera working" : "❌ Camera not detected"}
            </p>
          </div>

          {/* Mic Test */}
          <div>
            <h2 className="text-lg font-semibold">Microphone Test</h2>
            <button
              onClick={verifyMic}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Test Microphone
            </button>
            <p className="mt-2">
              {micVerified ? "✅ Microphone working" : "❌ Microphone not detected"}
            </p>
          </div>

          {/* Start Interview Button */}
          <button
            onClick={handleStartInterview}
            // disabled={!(cameraVerified && micVerified)}
            className={`w-full px-4 py-2 rounded-lg mt-4 ${
              cameraVerified && micVerified
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-amber-800 text-gray-200 cursor-not-allowed"
            }`}
          >
            Start Interview
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* Right Section: About / Guidelines */}
        <div className="w-full lg:w-[60%] bg-gray-900/50  p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-200 mb-4">
            Camera & Mic Access
          </h1>
          <div className="text-gray-200 space-y-4">
            <p>
              Velora AI requires access to your camera and microphone to ensure a
              smooth and reliable interview experience. This helps interviewers
              connect with you seamlessly and maintain the quality of the session.
            </p>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Interview Guidelines</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Make sure your camera is positioned at eye level.</li>
                <li>Use a quiet, well-lit environment for the interview.</li>
                <li>Test your microphone before starting to avoid disruptions.</li>
                <li>Ensure a stable internet connection throughout the session.</li>
                <li>
                  Keep all necessary documents or notes nearby for reference.
                </li>
              </ul>
            </div>
            <div className="text-sm text-gray-200 italic">
              <p>
                <b>Note:</b> Your camera and microphone will only be used during
                the interview. Velora AI respects your privacy and does not record
                sessions without consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreInterviewCheck;