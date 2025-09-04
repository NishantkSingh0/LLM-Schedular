import React, { useState, useRef, useEffect } from 'react';
import { Camera, CheckCircle, ArrowRight, Video, VideoOff } from 'lucide-react';

const InterviewRulesPage = () => {
  const [cameraStarted, setCameraStarted] = useState(false);
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 1280 },
          facingMode: 'user'
        }, 
        audio: false 
      });
      
      setStream(mediaStream);
      setCameraStarted(true);
      
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check camera permissions and ensure you are using HTTPS or localhost.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraStarted(false);
  };

  const handleProceedToInterview = () => {
    // In a real app, you would use React Router
    window.location.href = '/Interview';
  };

  useEffect(() => {
    // Set up video stream when camera is started and video ref is available
    if (cameraStarted && stream && videoRef.current) {
      const videoElement = videoRef.current;
      videoElement.srcObject = stream;
      
      const playVideo = async () => {
        try {
          await videoElement.play();
          console.log('Video started successfully');
        } catch (error) {
          console.error('Error playing video:', error);
        }
      };
      
      // Ensure video is loaded before playing
      if (videoElement.readyState >= 2) {
        playVideo();
      } else {
        videoElement.addEventListener('loadeddata', playVideo, { once: true });
      }
    }
    
    return () => {
      // Cleanup camera stream on unmount
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
          console.log('Camera track stopped');
        });
      }
    };
  }, [stream, cameraStarted]);

  const rules = [
    {
      title: "Camera & Audio Requirements",
      points: [
        "Ensure your camera is working and positioned at eye level",
        "Test your microphone before starting",
        "Maintain good lighting on your face",
        "Keep your camera on throughout the interview"
      ]
    },
    {
      title: "Environment Setup",
      points: [
        "Choose a quiet, private location",
        "Ensure stable internet connection",
        "Remove distractions from your background",
        "Have a backup device ready if possible"
      ]
    },
    {
      title: "Professional Conduct",
      points: [
        "Dress professionally as you would for an in-person interview",
        "Maintain eye contact by looking at the camera",
        "Speak clearly and at a moderate pace",
        "Be punctual and join the interview on time"
      ]
    },
    {
      title: "Technical Guidelines",
      points: [
        "Do not minimize or close the interview window",
        "Avoid using other applications during the interview",
        "Keep your device charged or plugged in",
        "Have a pen and paper ready for notes if needed"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-2">
            Device Integrity
          </h1>
          <p className="text-gray-300 text-lg">
            Make sure your camera and mic are properly working, and you are ready for interview
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Camera Section */}
          <div className={`transition-all duration-500 ease-in-out ${
            cameraStarted ? 'lg:order-1' : 'lg:order-1 lg:col-span-2 mx-auto'
          }`}>
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
              {/* <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              </h2> */}
              
              <div className={`relative bg-gray-700 rounded-lg overflow-hidden transition-all duration-500 ${
                cameraStarted ? 'h-96' : 'h-96'
              }`}>
                {!cameraStarted ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center mb-4">
                      <Camera size={40} className="text-gray-400" />
                    </div>
                    <p className="text-gray-300 mb-6 text-center">
                      Click the button below to start your camera and test your setup
                    </p>
                    <button
                      onClick={startCamera}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                    >
                      <Video size={20} />
                      Start Camera
                    </button>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover mirror"
                      style={{ transform: 'scaleX(-1)' }}
                    />
                    {/* <div className="absolute top-4 right-4">
                      <button
                        onClick={stopCamera}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                      >
                        <VideoOff size={20} />
                      </button>
                    </div> */}
                    {/* <div className="absolute bottom-4 left-4">
                      <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                        Live
                      </div>
                    </div> */}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Rules Section */}
          <div className={`transition-all duration-500 ease-in-out ${
            cameraStarted ? 'lg:order-2 opacity-100' : 'opacity-0 lg:hidden'
          }`}>
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-2xl font-semibold mb-6 text-yellow-400">
                Interview Rules & Regulations
              </h2>
              
              <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
                {rules.map((section, index) => (
                  <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                    <h3 className="text-lg font-semibold text-blue-300 mb-3">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-2 text-gray-300">
                          <CheckCircle size={16} className="text-green-400 mt-1 flex-shrink-0" />
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rulesAccepted}
                    onChange={(e) => setRulesAccepted(e.target.checked)}
                    className="w-5 h-5 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
                  />
                  <span className="text-white font-medium">
                    I accept all the conditions and am ready for the interview
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleProceedToInterview}
            disabled={!cameraStarted || !rulesAccepted}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center gap-2 ${
              cameraStarted && rulesAccepted
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            Proceed to Interview
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewRulesPage;