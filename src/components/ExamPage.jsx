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
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Camera Panel */}
      <div className="w-1/4 bg-white shadow-md p-4 flex flex-col items-center">
        <h2 className="text-lg font-semibold mb-2">Camera Feed</h2>
        <video ref={videoRef} autoPlay playsInline className="w-full rounded-md border" />
      </div>

      {/* Right Exam Panel */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Exam Started</h1>
        <p className="text-gray-700">Your questions will appear here...</p>
      </div>
    </div>
  );
};

export default ExamPage;