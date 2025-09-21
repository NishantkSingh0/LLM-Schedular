import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LoginUi() {
  const navigate = useNavigate();
  
  // WakeUp the Server
  useEffect(() => {
      fetch("http://127.0.0.1:5000/wakeup")
        .catch(() => {}); // ignore any errors
    }, []);

  const sections = [
    {
      title: "Student Login",
      description: "Individual Students can Practice their ability to select in Real Interviews",
      link: "/Student",
    },
    {
      title: "Organization Login",
      description: "Here organizations can schedule interviews for their selected candidates",
      link: "/Organization",
    },
    {
      title: "Candidate Login",
      description: "Org registered candidates can start their interview from here",
      link: "/Candidate",
    },
  ];


  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Full-screen container section */}
      <section className="min-h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col space-y-6 w-[90%] md:w-[80%] lg:w-[60%]">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-gray-800 rounded-2xl shadow-lg p-6 flex justify-between items-center hover:shadow-2xl hover:bg-gray-800/60 transition"
            >
              <div>
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                <p className="text-sm mt-2 text-gray-300">{section.description}</p>
              </div>
              <button
                onClick={() => navigate(section.link)}
                className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl cursor-pointer text-white"
              >
                Continue ➤
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
