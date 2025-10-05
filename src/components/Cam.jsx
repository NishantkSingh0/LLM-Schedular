import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ScreenWarning from "./NoMob.jsx";

const PreInterviewCheck = () => {
  const [cameraVerified, setCameraVerified] = useState(false);
  const [micVerified, setMicVerified] = useState(false);
  const [error, setError] = useState(null);
  const [micVolume, setMicVolume] = useState(0);
  const videoRef = useRef(null);
  const cameraStreamRef = useRef(null);
  const navigate = useNavigate();

  if (window.innerWidth < 1024) {
    return <ScreenWarning />;
  }

  // Camera Access Function
  const verifyCamera = async () => {
    try {
      // Stop old stream if exists
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      cameraStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true; // Required for autoplay in Chrome
        videoRef.current.playsInline = true;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current
            .play()
            .catch((err) => console.error("Video play error:", err));
        };
      }

      setCameraVerified(true);
      setError(null);
    } catch (err) {
      console.error("Camera error:", err);
      setError("Camera not detected");
      setCameraVerified(false);
    }
  };

  // Microphone Test
 const verifyMic = async () => {
  try {
    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(audioStream);
    source.connect(analyser);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let soundDetected = false;
    const startTime = Date.now();

    const checkMic = () => {
      analyser.getByteFrequencyData(dataArray);
      const volume = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
      setMicVolume(volume);

      if (volume > 10) {
        soundDetected = true;
      }

      const elapsed = (Date.now() - startTime) / 1000;

      if (elapsed >= 5) { // ✅ must run for 5s
        if (soundDetected) {

          setMicVerified(true);
          setError(null);
        } else {
          setMicVerified(false);
          setError("No sound detected. Please speak into the mic.");
        }

        audioStream.getTracks().forEach(track => track.stop());
        audioContext.close();
      } else {
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
    if (cameraVerified && micVerified) {
      navigate("/Interview");
    } else {
      setError("Please verify camera and microphone first.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-6">
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
              muted
              className="w-full h-48 rounded-md border mt-2 bg-black object-cover"
            />
            <button
              onClick={verifyCamera}
              className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              Access Camera
            </button>
            <p className="mt-2">
              {cameraVerified ? "✅ Camera working" : "❌ Camera not detected"}
            </p>
          </div>

          {/* Mic Test */}
          <div>
            <button
              onClick={verifyMic}
              className={`px-4 py-2 bg-blue-500 text-white ${
                micVerified ? "hidden" : ""
              } rounded-lg hover:bg-blue-600`}
            >
              Test Microphone
            </button>

            <div className="w-full h-2 bg-gray-600 rounded mt-2">
              <div
                className="h-2 bg-green-500 rounded transition-all"
                style={{ width: `${Math.min(micVolume * 3, 100)}%` }}
              ></div>
            </div>

            <p className="mt-2">
              {micVerified ? "✅ Microphone working" : "❌ Speak to test mic"}
            </p>
          </div>

          {/* Start Interview Button */}
          <button
            onClick={handleStartInterview}
            disabled={!(cameraVerified && micVerified)}
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

        {/* Right Section */}
        <div className="w-full lg:w-[60%] bg-gray-900/50 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-200 mb-4">
            Camera & Mic Access
          </h1>
          <div className="text-gray-200 space-y-4">
            <p>
              Velora.ai requires access to your camera and microphone to deliver
              a seamless and interactive interview experience.
            </p>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Interview Guidelines</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Make sure your camera is positioned at eye level.</li>
                <li>Use a quiet, well-lit environment for the interview.</li>
                <li>Speak clearly and test your microphone before starting.</li>
                <li>
                  Ensure a stable internet connection throughout the session.
                </li>
                <li>
                  Keep your face clearly visible in the camera at all times.
                </li>
              </ul>
            </div>
            <div className="text-md text-gray-200 italic">
              <p>
                <b>Note:</b>{" "}
                <span className="font-bold text-gray-300">
                  Multiple faces, background voices, screen blur, or any form of
                  malpractice
                </span>{" "}
                are strictly prohibited. Such actions will affect your scores
                and lead to mid interview termination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreInterviewCheck;
