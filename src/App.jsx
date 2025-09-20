import { useState } from 'react'
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./components/practice.jsx";
import StudentLogin from "./components/Student/studentLogin.jsx";
import OrgLogin from "./components/Org/OrgLogin.jsx";
import CandidateLogin from "./components/Candidate/candLogin.jsx";
import LoginUi from "./components/LoginPage.jsx";
import ScheduleInterview from "./components/LLMSchedular.jsx";
import InterviewRulesPage from "./components/RulesPage.jsx";

function App() {

  return (
      <div>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<LoginUi />} />
          <Route path="/Student" element={<StudentLogin />} />
          <Route path="/Candidate" element={<CandidateLogin />} />
          <Route path="/Organization" element={<OrgLogin />} />
          <Route path="/Interview" element={<ScheduleInterview />} />
        </Routes>
      </div>
  )
}

export default App
