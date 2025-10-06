import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Typed from "typed.js";

export default function DropboxFrontPage() {
  const navigate = useNavigate();  
  const images = [
    "Marketing/IMG-1.jpg",
    "Marketing/IMG-2.jpg",
    "Marketing/IMG-3.jpg",
    "Marketing/IMG-4.jpg",
    "Marketing/IMG-5.jpg",
    "Marketing/IMG-6.jpeg",
    "Marketing/IMG-7.jpg",
  ];

  const Features = [
    "AI-powered interviews that evaluate candidates thoroughly.",
    "Reduce traditional interview time and cost; pay as low as ₹15-20 per interview.",
    "Companies can schedule multiple candidate interviews in minutes by uploading emails and job requirements.",
    "Candidates receive secure login credentials automatically for the interview.",
    "Easy-to-use interface for both organizations and individuals.",
    "Our ATS analyzes resumes and prioritizes questions based on company needs.",
    "Candidates answer high-level questions in voice mode, converted to text automatically.",
    "LLM scores candidates on multiple metrics: knowledge, confidence, experience, and resume alignment.",
    "Organizations receive detailed, easy-to-read reports to make quick and informed decisions.",
    "Students can self-register, take mock interviews, and get scored for their career preparation.",
    "Suitable for batch interviews or individual assessments, adaptable for any company size.",
    "Make high-quality evaluation accessible for small startups, colleges, and individuals."
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
      fetch("http://127.0.0.1:8000/wakeup/")
        .catch(() => {});
  }, []);


  useEffect(() => {
    const typed=new Typed("#desktop-typing-text",{
      strings: Features,
      loop: true,
      typeSpeed: 20,
      backSpeed: 15,
      backDelay: 1500,
      cursorChar: " "
    });
      return ()=>{
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const leftIndex = (activeIndex - 1 + images.length) % images.length;
  const rightIndex = (activeIndex + 1) % images.length;

  return (
    <>
      {/* Hero section */}
      <section id="Home" className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-10 text-white flex flex-col">
        <nav className="flex items-center justify-between px-10 py-4 border-y border-gray-700 sticky top-0 backdrop-blur-lg z-50">

          <div className="hidden md:block text-xl font-bold bg-gradient-to-r  from-blue-400 to-purple-500 bg-clip-text text-transparent">

            AI Based Hiring Management System
          </div>
          <div className="flex items-center gap-6">
            <a 
              href="https://NishantkSingh0.github.io/Resume-Builder" 
              title="Our Resume builder helps you design your resume efficiently" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg font-medium mr-5 text-slate-300 hover:text-white transition"
            >
              Design your Resume
            </a>
            <button onClick={() => navigate("/WhatsNew")} className="relative cursor-pointer flex items-center w-[9.5em] h-[2.9em] border-[0.2em] border-[#3654ff] rounded-[11px] bg-transparent text-white overflow-hidden transition-all duration-500 hover:bg-[#3654ff]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                   className="w-6 h-6 ml-2 mr-2 transition-transform duration-500 ease-in-out hover:translate-x-1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
              <span className="ml-0.5 pr-1.5">What's New</span>
            </button>
          </div>
        </nav>

        <div className="flex flex-col px-4 md:flex-row items-center justify-between max-w-6xl mx-auto mt-20 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-left max-w-lg"
          >
            {/* <h2 className="text-blue-400 font-semibold">
              AI Based Hiring Management System
            </h2> */}
            <h1 className="text-4xl md:text-5xl font-extrabold mt-4 leading-snug">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Smarter Hiring.
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Faster Scheduling.
              </span>
            </h1>
            <p className="text-gray-300 mt-4 text-lg max-w-md">
              It asks intelligent, role-specific questions, digs deeper into their field knowledge,  
              and adapts in real-time based on their responses.  <br />
              Get structured candidate insights, unbiased evaluations, and a streamlined hiring process — all in one place.
            </p>
            <div className="flex gap-4 mt-6">
              <button onClick={() => navigate("/EmailVerification",{ state: { from: "Org" } })} className="px-6 py-2 rounded-full text-gray-200 cursor-pointer bg-gray-800 hover:bg-gray-700">
                Organization Login
              </button>
              <button onClick={() => navigate("/EmailVerification", { state: { from: "Std" } })} className="px-6 py-2 rounded-full bg-blue-600 text-white cursor-pointer hover:bg-blue-700">
                Student Login
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 hidden lg:flex justify-center items-center min-h-[350px]"
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-700 bg-gray-900">
              <img
                src="HomePageInterviewShowcase.png"
                alt="AI Interview"
                className="w-full h-full object-cover"
                draggable="false"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marketing Section */}
      <section id="Features" className="w-full hidden lg:block bg-gradient-to-r from-gray-950 via-gray-900 to-black py-20 text-white">
        <div className="flex flex-col items-center justify-center mb-12">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Workflow and Schedules</h1>
          <div className="w-[15%] h-1 bg-gradient-to-r from-blue-500 to-purple-600 mb-6 mx-auto mt-3 rounded"></div>
        </div>
        <div className="max-w-6xl mx-auto flex justify-center items-center gap-6">
          {[leftIndex, activeIndex, rightIndex].map((index) => {
            const isCenter = index === activeIndex;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isCenter ? 1 : 0.5,
                  scale: isCenter ? 1.1 : 0.9,
                }}
                transition={{ duration: 0.6 }}
                className={`rounded-2xl overflow-hidden shadow-2xl border border-gray-700 bg-gray-800 hover:scale-105 transition-transform duration-300 ${
                  isCenter ? "z-10" : "z-0"
                }`}
                style={{
                  width: isCenter ? "40%" : "30%",
                  minHeight: "270px",
                }}
              >
                <img
                  src={images[index] || ""}
                  alt={`feature-${index}`}
                  className="w-full h-[300px] object-cover"
                  draggable="false"
                />
              </motion.div>
            );
          })}
        </div>
        <div className="flex flex-col items-center justify-center flex-1 mt-16 mb-3">
          <span id="desktop-typing-text" className="text-2xl text-gray-200 h-6"></span>
        </div>
      </section>

     <footer className="bg-gray-900 text-gray-200 px-8 py-12">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* About Section */}
    <div>
      <h2 className="text-white font-bold text-lg mb-4">Make Interviews Smarter + Deeper</h2>
      <p className="text-gray-400 leading-relaxed">
        Streamline your hiring process with AI-powered interviews, automated scheduling, and comprehensive candidate evaluation. Accessible for organizations and individuals at an affordable cost.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h2 className="text-white font-bold text-lg mb-4">Quick Links</h2>
      <ul className="space-y-2">
        <li><a href="#" className="hover:text-teal-400 transition-colors">What's new We provide</a></li>
        <li><a href="#" className="hover:text-teal-400 transition-colors">Home Page</a></li>
        <li><a href="#" className="hover:text-teal-400 transition-colors">Features Page</a></li>
        <li><a href="#" className="hover:text-teal-400 transition-colors">Pricing Section</a></li>
      </ul>
    </div>

    {/* Contact Section */}
    <div>
      <h2 className="text-white font-bold text-lg mb-4">Contact Us</h2>
      <p className="text-gray-400">Service Mail: <a href="mailto:nishantsingh.talk@gmail.com" className="hover:text-teal-400 transition-colors">nishantsingh.talk@gmail.com</a></p>
      <p className="text-gray-400 mt-2">Phone: <a href="tel:+911234567890" className="hover:text-teal-400 transition-colors">+91 12345 67890</a></p>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
    © 2025 <a href="https://nishantksingh0.github.io" target="_blank" className="hover:text-teal-400 transition-colors">nishantksingh0.github.io</a>. All rights reserved.
  </div>
</footer>


    </>
  );
}

