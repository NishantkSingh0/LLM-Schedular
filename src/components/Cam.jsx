import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const PreInterviewCheck = () => {
  const [cameraVerified, setCameraVerified] = useState(false);
  const [micVerified, setMicVerified] = useState(false);
  const [error, setError] = useState(null);
  const [micVolume, setMicVolume] = useState(0); // For showing mic activity bar
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

          // ✅ Detect if video actually starts rendering
          videoRef.current.onloadeddata = () => {
            setCameraVerified(true);
          };
        }
      })
      .catch((err) => {
        console.error("Camera error:", err);
        setError("Camera not detected");
        setCameraVerified(false);
      });

    return () => {
      // Stop camera stream on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
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

      let detectionTimeout;
      let soundDetected = false;

      const checkMic = () => {
        analyser.getByteFrequencyData(dataArray);
        const volume = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
        setMicVolume(volume); // show in UI

        if (volume > 10) {
          soundDetected = true;
          setMicVerified(true);
          clearTimeout(detectionTimeout);
          audioStream.getTracks().forEach((track) => track.stop());
          audioContext.close();
        } else {
          requestAnimationFrame(checkMic);
        }
      };

      // Stop checking after 5 seconds if no sound detected
      detectionTimeout = setTimeout(() => {
        if (!soundDetected) {
          setMicVerified(false);
          audioStream.getTracks().forEach((track) => track.stop());
          audioContext.close();
          setError("No sound detected. Please speak and try again.");
        }
      }, 5000);

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
              className="w-full h-48 rounded-md border mt-2 bg-black"
            />
            <p className="mt-2">
              {cameraVerified ? "✅ Camera working" : "❌ Camera not detected"}
            </p>
          </div>

          {/* Mic Test */}
          <div>
            {/* <h2 className="text-lg font-semibold">Microphone Test</h2> */}
            <button
              onClick={verifyMic}
              className={`px-4 py-2 bg-blue-500 text-white ${micVerified ? "hidden":""} rounded-lg hover:bg-blue-600`}
            >
              Test Microphone
            </button>

            {/* Mic Volume Bar */}
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
        <div className="w-full lg:w-[60%] bg-gray-900/50 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-200 mb-4">
            Camera & Mic Access
          </h1>
          <div className="text-gray-200 space-y-4">
            <p>
              Velora.ai requires access to your camera and microphone to deliver
              a seamless and interactive interview experience. This allows our
              system to engage with you in real time and accurately evaluate
              your knowledge.
            </p>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Interview Guidelines</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Make sure your camera is positioned at eye level.</li>
                <li>Use a quiet, well-lit environment for the interview.</li>
                <li>Speak clearly and test your microphone before starting.</li>
                <li>Ensure a stable internet connection throughout the session.</li>
                <li>Keep your face clearly visible in the camera at all times.</li>
              </ul>
            </div>
            <div className="text-md text-gray-200 italic">
              <p>
                <b>Note:</b> <span className="font-bold text-gray-300">Multiple faces, background voices, screen blur, or any form of malpractice</span> are strictly prohibited. Such actions will affect your scores and lead to mid interview termination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreInterviewCheck;