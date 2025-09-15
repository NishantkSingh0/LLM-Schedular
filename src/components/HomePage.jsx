import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function HomePage() {
  const navigate = useNavigate();

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

  const sliderImages = [
    { src: "/images/step1.png", caption: "Upload Candidate Details" },
    { src: "/images/step2.png", caption: "AI Auto-Schedules Interviews" },
    { src: "/images/step3.png", caption: "Conduct Interviews Seamlessly" },
    { src: "/images/step4.png", caption: "Get AI-Based Feedback & Reports" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1
    );
  };

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

      {/* Second section: Horizontal image slider */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-950">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="relative w-full max-w-4xl overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {sliderImages.map((img, idx) => (
              <div
                key={idx}
                className="min-w-full flex flex-col items-center justify-center"
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
                <p className="mt-4 text-lg">{img.caption}</p>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 p-3 rounded-full hover:bg-gray-600"
          >
            ▶
          </button>
        </div>
      </section>
    </div>
  );
}
