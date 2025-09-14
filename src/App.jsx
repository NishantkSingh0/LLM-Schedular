import { useState } from 'react'
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./components/practice.jsx";
import StudentLogin from "./components/Student/studentLogin.jsx";
import OrgLogin from "./components/Org/OrgLogin.jsx";
import CandidateLogin from "./components/Candidate/candLogin.jsx";
import HomePage from "./components/HomePage.jsx";
import ScheduleInterview from "./components/LLMSchedular.jsx";
import InterviewRulesPage from "./components/RulesPage.jsx";

function App() {

  return (
    <Router>
      <div>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Student" element={<StudentLogin />} />
          <Route path="/Candidate" element={<CandidateLogin />} />
          <Route path="/Organization" element={<OrgLogin />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
