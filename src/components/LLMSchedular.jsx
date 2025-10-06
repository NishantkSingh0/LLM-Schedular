import React, { useState, useEffect, useRef } from 'react';
import ScreenWarning from './NoMob.jsx';
import { useLocation } from "react-router-dom";
import {RotateCw, Pause, Mic, MicOff, SkipForward,Circle } from 'lucide-react';
import toast from "react-hot-toast";

const ScheduleInterview = () => {
  // Hardcoded JSON data
  const initialData = {
    resume: "SGVsbG8gV29ybGQhIFRoaXMgaXMgYSBzYW1wbGUgcmVzdW1lIGluIEJhc2U2NC4=", // "Hello World! This is a sample resume in Base64."
    userName: "Nishant Singh",
    orgNeed: "Software Development",
    positionLevel: "Senior"
  };
   
  const [Info, setInfo] = useState("");

  const location = useLocation();
  if (window.innerWidth < 1024) {
    return <ScreenWarning />;  // Smaller screens not allowed
  }

  // State management
  const [userData] = useState(initialData);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsAnswers, setQuestionsAnswers] = useState({});
  const [ttsCache, setTtsCache] = useState({});
  const [ReplayCount,setReplayCount] = useState(1);
  // const [recordedAudioCache, setRecordedAudioCache] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isNext, SetIsNext] = useState(false)
  const [error, setError] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunks = useRef([]);

  useEffect(() => {
    const goFullScreen = async () => {
      try {
        const elem = document.documentElement; // entire page
        if (elem.requestFullscreen) await elem.requestFullscreen();
        else if (elem.webkitRequestFullscreen) await elem.webkitRequestFullscreen();
        else if (elem.msRequestFullscreen) await elem.msRequestFullscreen();
      } catch (err) {
        console.error("Fullscreen request failed:", err);
      }
    };
    goFullScreen();
  }, []);

  const fetchQuestions = async (orgNeed, positionLevel) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/qns/", {              // https://llm-schedular.onrender.com/qns   ---   http://127.0.0.1:8000
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orgNeed: orgNeed,
          positionLevel: positionLevel
        })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      const data = await response.json();
      return data; // data should contain { questions: [] }
    } catch (error) {
      console.error("Error fetching questions:", error);
      return { questions: [] };
    }
  };

  const STT = async (RecordingBlob) => {
    try {
      if (!RecordingBlob) {
        throw new Error("audio Blob is empty (In STT)");
      }

      const formData = new FormData();
      formData.append("file", RecordingBlob, "audio.wav");

      const response = await fetch("http://127.0.0.1:8000/stt/", {                 // https://llm-schedular.onrender.com/stt   ----   http://127.0.0.1:8000
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("STT API call failed");
      }

      const data = await response.json();
      return data.transcription; // The text returned by Flask
    } catch (error) {
      console.error(error);
      throw new Error("STT conversion failed");
    }
  };

  // Initialize questions on component mount
  useEffect(() => {
    const initializeQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await fetchQuestions(userData.orgNeed, userData.positionLevel);
        const questionsArray = response.questions;
        setQuestions(questionsArray);
        
        // Initialize questions-answers state object
        const initialAnswers = {};
        questionsArray.forEach((question, index) => {
          initialAnswers[index] = {
            question: question,
            answer: ""
          };
        });
        setQuestionsAnswers(initialAnswers);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeQuestions();
  }, [userData.orgNeed, userData.positionLevel]);

  const TTS = async (text) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/tts/", {               // https://llm-schedular.onrender.com/tts   ---   http://127.0.0.1:8000
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      if (!response.ok) throw new Error("Failed to fetch TTS audio");

      const arrayBuffer = await response.arrayBuffer();
      const audioBlob = new Blob([arrayBuffer], { type: "audio/wav" });

      return audioBlob;
    } catch (error) {
      console.error(error);
      throw new Error("TTS conversion failed");
    }
  };

  // Handle TTS and auto-play when question changes
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      handleTTSAndPlay();
      setReplayCount(0)
    }
  }, [currentQuestionIndex, questions]);

  const handleTTSAndPlay = async () => {
    const currentQuestion = questions[currentQuestionIndex];

    try {
      // Check if TTS audio is already cached
      if (!ttsCache[currentQuestionIndex]) {
        const audioBlob = await TTS(currentQuestion);

        setTtsCache(prev => ({
          ...prev,
          [currentQuestionIndex]: audioBlob
        }));
        
        // Auto-play the audio
        toast.success("Auto Playing the audio");
        playTTSAudio(audioBlob);
      } else {
        // Use cached audio
        toast.success("Playing the audio from cache");
        playTTSAudio(ttsCache[currentQuestionIndex]);
      }
    } catch (err) {
      setError('Failed to generate TTS audio');
    }
  };

  const playTTSAudio = async (audioBlob) => {
    if (audioRef.current && audioBlob) {
      // Convert Blob → Object URL
      const audioUrl = URL.createObjectURL(audioBlob);

      // Assign URL to audio element
      audioRef.current.src = audioUrl;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        toast.success("Audio is playing");
      } catch (err) {
        console.error("Autoplay failed:", err);
        toast.error("Autoplay blocked! Click Replay to play manually.");
      }

      // Optional: revoke URL after playback to free memory
      audioRef.current.onended = () => {
        URL.revokeObjectURL(audioUrl);
        setIsPlaying(false);
      };
    }
  };

  const handleAudioEnded = async () => {
    setIsPlaying(false);
    // Wait for 2 Seconds
    // await new Promise((resolve) => setTimeout(resolve, 500));
    // Auto-start recording after TTS ends
    await startRecording();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      recordedChunks.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      await new Promise((resolve) => setTimeout(resolve, 10000));
      SetIsNext(true);
    } catch (err) {
      setError('Failed to start recording');
    }
  };

  const stopRecording = () => {
    return new Promise((resolve) => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.onstop = async () => {
          const blob = new Blob(recordedChunks.current, { type: 'audio/wav' });
          
          // Cache the recorded audio
          // setRecordedAudioCache(prev => ({
          //   ...prev,
          //   [currentQuestionIndex]: blob
          // }));
          
          resolve(blob);
        };
        
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        SetIsNext(false);
        
        // Stop all tracks
        if (mediaRecorderRef.current.stream) {
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
      }
    });
  };

  const handleNext = async () => {
    try {
      // Stop recording and get the audio
      const recordedAudio = await stopRecording();
      
      // Convert recorded audio to text using STT
      const transcription = await STT(recordedAudio);
      
      // Update the answer for current question
      setQuestionsAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: {
          ...prev[currentQuestionIndex],
          answer: transcription
        }
      }));

      // Move to next question or complete
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // All questions completed
        setIsCompleted(true);
        console.log('Final Questions and Answers:', questionsAnswers);
      }
    } catch (err) {
      setError('Failed to process answer');
    }
  };

  const replayTTS = () => {
    if (ttsCache[currentQuestionIndex]) {
      toast.success("RePlaying the audio");
      setReplayCount(prev => prev+1)
      setIsRecording(false)
      SetIsNext(false)
      playTTSAudio(ttsCache[currentQuestionIndex]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading ...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
        <div className="max-w-2xl mx-auto text-center bg-gray-800 rounded-lg p-10 shadow-lg">
          <h1 className="text-3xl font-bold text-green-400 mb-4">Interview Successfully Completed!</h1>
          <p className="text-gray-300 text-lg">
            You completed the interview successfully. and Scores are sent to organization.
          </p>
          <p className="text-gray-400 mt-4">You can exit now.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-900 pt-6">
      <div className="max-w-[80%] h-screen mx-auto">

        {/* Question Progress */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6">
          <div className="flex justify-center items-center my-2">
            <div className="w-full max-w-[80%] bg-gray-700 rounded-full h-2 ml-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Current Question */}
        <div className="bg-gray-800 h-[69%] rounded-lg p-6 mb-6">
          <div className="mx-10 my-3">
            <p className="text-xl text-white font-medium leading-relaxed">
              Q&nbsp;&nbsp;{currentQuestion}
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center space-x-10">
            <button
              onClick={replayTTS}
              disabled={isPlaying || ReplayCount>2}
              title={ReplayCount>2?'Disabled..':'Replay question audio'}
              className={`flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 ${(ReplayCount>2 || isPlaying)?'cursor-pointer':''} disabled:bg-gray-600 text-white rounded-lg transition-colors ${"cursor-blocked"}`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <RotateCw className="w-5 h-5" />}
            </button>

            <div title={isRecording ? "Your answer is recording" : "Microphone is off"} className={`flex items-center px-4 py-2 rounded-lg ${
              isRecording ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}>
              {isRecording ? <Mic className="w-5 h-5 animate-pulse" /> : <MicOff className="w-5 h-5" />}
            </div>

            <button
              onClick={handleNext}
              disabled={!isNext}
              title={isNext?'Submit answer and continue to next question':"Don't Rush"}
              className={`flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-semibold ${isNext?'cursor-pointer':''} transition-colors`}
            >
              <SkipForward className="w-5 h-5" />
            </button>
        </div>
        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          onEnded={handleAudioEnded}
          className="hidden"
          // controls
        />
      </div>
    </div>
  );
};

export default ScheduleInterview;