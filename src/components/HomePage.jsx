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

  // WakeUp the Server
  useEffect(() => {
      fetch("http://127.0.0.1:8000/wakeup/")     // http://127.0.0.1:8000/wakeup    ---    https://llm-schedular.onrender.com/wakeup
        .catch(() => {}); // ignore any errors
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

  // Auto-slide every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Get the 3 images to show (left, center, right)
  const leftIndex = (activeIndex - 1 + images.length) % images.length;
  const rightIndex = (activeIndex + 1) % images.length;

  return (
    <>
      {/* Hero section */}
      <section id="Home" className="min-h-screen bg-gray-900 py-10">
        {/* Top Navigation */}
        <nav className="w-full bg-gray-700 max-w-full px-4 md:px-28 flex justify-between items-center py-4">
            <a href="https://NishantkSingh0.github.io/Resume-Builder" title="Our Resume builder helps you design you resume at end Timing" target="_blank">
              <span className="group">
                <span className="text-xl text-slate-300 transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-pink-500 group-hover:to-red-300">
                  Design your Resume
                </span>
              </span>
            </a>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600  text-white rounded-lg hover:bg-blue-700">What's new</button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col px-4 md:flex-row items-center justify-between max-w-6xl mx-auto mt-20 gap-10">
          {/* LEFT: Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-left"
          >
            <h2 className="text-blue-600 font-semibold">
              AI Based Hiring Management System
            </h2>
            <h1 className="text-4xl md:text-5xl text-gray-300 font-bold mt-4">
              Smarter Hiring.<br />Faster Scheduling.
            </h1>
            <p className="text-gray-400 mt-4 text-lg max-w-md">
              It asks intelligent, role-specific questions, digs deeper into their field knowledge,  
              and adapts in real-time based on their responses.  <br />
              Get structured candidate insights, unbiased evaluations, and a streamlined hiring process —  
              all in one place.
            </p>
            <div className="flex gap-4 mt-6">
              <button onClick={() => navigate("/Organization")} className="px-4 py-2 rounded-lg text-gray-200 cursor-pointer bg-gray-800 hover:bg-gray-800/50">
                Organization Login
              </button>
              <button onClick={() => navigate("/Student")} className="px-4 py-2 rounded-full bg-blue-600 text-white cursor-pointer hover:bg-blue-700">
                Student Login
              </button>
            </div>
          </motion.div>

          {/* RIGHT: Image Section (fixed space) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex-1 hidden lg:flex justify-center items-center min-h-[350px]"
          >
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-700 bg-gray-900">
              <img
                src="HomePageInterviewShowcase.png"
                alt="Dropbox preview"
                className="w-full h-full object-cover"
                draggable="false"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marketing Section */}
      <section id="Features" className="w-full hidden lg:block bg-black py-15">
        <div className="flex flex-col items-center text-gray-300 justify-center mb-15">
          <h1 className="text-2xl font-bold font-sans">Workflow and Schedules</h1>
          <div className="w-[15%] h-1 bg-blue-900 mb-6 mx-auto mt-1 rounded dark:bg-amber-800"></div>
        </div>
        <div className="max-w-6xl mx-auto flex justify-center items-center gap-6">
          {[leftIndex, activeIndex, rightIndex].map((index, i) => {
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
                className={`rounded-2xl overflow-hidden shadow-xl border border-gray-700 bg-gray-900 ${
                  isCenter ? "z-10" : "z-0"
                }`}
                style={{
                  width: isCenter ? "40%" : "30%",
                  minHeight: "270px", // container keeps height even if image missing
                }}
              >
                <img
                  src={images[index] || ""}
                  alt={`feature-${index}`}
                  className="w-full h-[300px] object-fill"
                  draggable="false"
                />
              </motion.div>
            );
          })}
        </div>
        <div className="flex flex-col items-center justify-center flex-1 mt-16 mb-3">
          <span id="desktop-typing-text" className="text-2xl text-gray-300 h-6"></span>
        </div>

      </section>

      <footer className="bg-gray-950 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-10">

          {/* About Section */}
          <div className="hidden md:block flex-1">
            <h2 className="text-xl font-bold text-white mb-4">Make Interviews Smarter + Deeper</h2>
            <p className="text-gray-400 max-w-sm">
              Streamline your hiring process with AI-powered interviews, automated scheduling, and comprehensive candidate evaluation. Accessible for organizations and individuals at an affordable cost.
            </p>
          </div>
          <div className="block md:hidden flex-1">
            <h2 className="text-xl font-bold text-white mb-4">Less Features and View in Mob View</h2>
            <p className="text-gray-400 max-w-sm">
              Mobile view has limited functionality and features. For the best experience, please use our service on a desktop.            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">What's new We provide</a></li>
              <li><a href="#Home" className="hover:text-white">Home Page</a></li>
              <li><a href="#Features" className="hover:text-white">Features Page</a></li>
              <li><a href="https://nishantksingh0.github.io/LLM-Schedular/#/Pricings" target="_blank" className="hover:text-white">Pricing Section</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Service Mail: <a href="mailto:nishantsingh.talk@gmail.com" className="hover:text-white">nishantsingh.talk@gmail.com</a></li>
              {/* <li>Website: <a href="https://nishantksingh0.github.io" target="_blank" className="hover:text-white">nishantksingh0.github.io</a></li> */}
              <li>Phone: <a href="tel:+911234567890" className="hover:text-white">+91 12345 67890</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} <a href="https://nishantksingh0.github.io" target="_blank" >nishantksingh0.github.io</a>. All rights reserved.
        </div>
      </footer>

    </>
  );
}
