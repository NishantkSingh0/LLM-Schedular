import { useState } from 'react'
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./components/practice.jsx";
import StudentLogin from "./components/studentLogin.jsx";
import OrgLogin from "./components/OrgLogin.jsx";
import CandidateLogin from "./components/candLogin.jsx";
import Animate from "./components/AnimatePages.jsx"
import LoginUi from "./components/LoginPage.jsx";
import HomePage from './components/HomePage.jsx';
import ScreenWarning from './components/NoMob.jsx';
import ScheduleInterview from "./components/LLMSchedular.jsx";
import InterviewRulesPage from "./components/RulesPage.jsx";
import AddCandidateBatch from "./components/AddCandidatesBatch.jsx";
import Cam from "./components/Cam.jsx";
import ExamPage from "./components/ExamPage.jsx";



function App() {

  const isDesktop = window.innerWidth >= 1024;

  if (!isDesktop) {
    return <ScreenWarning />;       // Smaller Screens not Allowed
  }

  return (
    // <>
    //     <HomePage/>
    // </>
    <div className="relative min-h-screen bg-gray-900">
      <AnimatePresence mode="wait">
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/Login" element={<Animate><LoginUi /></Animate>} /> */}
          <Route path="/Student" element={<Animate><StudentLogin /></Animate>} />
          <Route path="/Candidate" element={<Animate><CandidateLogin /></Animate>} />
          <Route path="/Organization" element={<Animate><OrgLogin /></Animate>} />
          <Route path="/Organization/Add_Candidates" element={<Animate><AddCandidateBatch /></Animate>} />
          <Route path="/Interview" element={<Animate><ScheduleInterview /></Animate>} />
          <Route path="/verification" element={<Cam />} />
          <Route path="/exam" element={<ExamPage />} />

        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
