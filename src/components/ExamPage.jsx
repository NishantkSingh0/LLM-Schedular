import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ExamPage = () => {
  const location = useLocation();
  const videoRef = useRef(null);

  useEffect(() => {
    if (location.state && location.state.stream && videoRef.current) {
      videoRef.current.srcObject = location.state.stream;
    }
  }, [location]);

  return (
    <div className="flex min-h-screen bg-gray-950 p-6 text-white">
      {/* Left Camera Panel */}
      <div className="w-1/4 bg-gray-900 border border-gray-700 rounded-xl p-6 flex flex-col">
        <h2 className="text-lg font-semibold text-gray-200 mb-4">Camera Feed</h2>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full aspect-video rounded-lg border border-gray-700 bg-gray-800"
        />
      </div>

      {/* Right Exam Panel */}
      <div className="flex-1 bg-gray-900 border border-gray-700 rounded-xl p-6 ml-6">
        <h1 className="text-xl font-bold text-gray-100">Exam Started</h1>
        <p className="text-purple-400 mt-2">
          Your questions will appear here...
        </p>
      </div>
    </div>
  );
};

export default ExamPage;