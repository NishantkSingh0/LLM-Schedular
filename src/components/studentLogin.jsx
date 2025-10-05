import { useState, useEffect } from "react";
import Suggestions from "./Suggestions.jsx";
import { Upload, FileText } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import ScreenWarning from './NoMob.jsx';
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth } from "../firebase.js";


export default function StudentLogin() {

  // if (window.innerWidth < 1024) {
  //   return <ScreenWarning />;  // Smaller screens not allowed
  // }
  const location = useLocation();
  const [formData, setFormData] = useState({
      StudentMail : "",
      StudentName : "",
      Tokens : 0,
      ExpectedPosition : "",
      Designation : "",
      Resume : "",
      Scores : [],
      OurFeedback : "",
      ImprovementsNeeded : ""
  });
  const [loading, setLoading] = useState(false);

  const levels=["Beginner","I", "II", "III", "Advanced"]
  const navigate=useNavigate();

  useEffect(() => {
    if (location.state?.email) {
      setFormData((prev) => ({ ...prev, StudentMail: location.state.email }));
    }
  }, [location.state?.email]);

  const handleSelectChange = (val) => {
    setFormData({ ...formData, Designation: val });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, ExpectedPosition: e.target.value });
  };


  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file && file.type === "application/pdf") {
      
      // Prepare form data for upload
      const formDataToSend = new FormData();
      formDataToSend.append("Resume", file);
      
      try {
        const res = await fetch("http://127.0.0.1:8000/ParseResumes/", {
          method: "POST",
          body: formDataToSend,
        });
        
        if (!res.ok) throw new Error("Failed to upload resume");
        
        const data = await res.json();
        console.log("Parsed Resume Text:", data); // or data.text depending on backend
        setFormData({ ...formData, Resume: data.parsed_text});
        
        toast.success("Resume parsed successfully!");

        // optionally set parsed text in state
        // setParsedText(data.text);

      } catch (err) {
        console.error("Error:", err);
        toast.error("Error uploading or parsing resume");
      }
    } else {
      toast.error("Please upload a PDF file only!");
    }
  };


  const handleGoogleLogin = async () => {
    // try {
    //   const provider = new GoogleAuthProvider();
    //   const result = await signInWithPopup(auth, provider);

    //   // The signed-in user info
    //   const user = result.user;
    //   console.log("User:", user.displayName, user.email, user.emailVerified);
    //   toast.success("User:", user.displayName, user.email, user.emailVerified);
    //   // emailVerified will always be true for Google users
    // } catch (error) {
    //   console.error(error);
    //   toast.error(error)
    // }
    toast.error("Authentication Login script is not managed")
  };

  const handleNext = async (e) => {
    e.preventDefault();
    console.log(formData)
    if (!formData.StudentMail || !formData.StudentName || !formData.Designation || !formData.ExpectedPosition || !formData.Resume) { //  !formData.username || !formData.password ||
      toast.error("Please fill all fields and upload a PDF resume!");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/create-student/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Server Response:", result);

      if (result.status === "created") {
        toast.success("You are registered successfully.");
        navigate('/verification', { state: result.data })
        toast.success("Organization created successfully!");
      } else {
        toast.error("Failed to register!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-[510px] m-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Login</h2>

        <form className="space-y-4" onSubmit={handleNext}>
          {/* Designation */}
          <div>
            {/* <label className="block text-sm mb-2">Designation</label> */}
            <Suggestions
              label="Designation"
              placeholder="Search your designation..."
              value={formData.Designation}
              onChange={(val) => {handleSelectChange(val)}}    //{handleSelectChange(value)}
              suggestions={["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer","Mobile App Developer", "Web Developer", "UI/UX Designer", "UI Developer", "UX Researcher","Graphic Designer", "Game Developer", "DevOps Engineer", "Cloud Engineer", "Cloud Architect","Data Engineer", "Data Scientist", "Machine Learning Engineer", "AI Engineer", "NLP Engineer","Computer Vision Engineer", "Deep Learning Engineer", "Big Data Engineer", "Data Analyst","Business Intelligence Analyst", "Database Administrator", "System Administrator","Network Administrator", "IT Support Specialist", "IT Technician", "IT Security Analyst","Cybersecurity Specialist", "Information Security Analyst", "Security Architect","Solutions Architect", "Technical Architect", "System Architect", "Software Architect","Firmware Engineer", "Embedded Systems Engineer", "IoT Developer", "Blockchain Developer","AR/VR Developer", "Game Designer", "Technical Support Engineer", "QA Tester", "QA Analyst","QA Engineer", "Automation Tester", "Test Engineer", "Performance Test Engineer","Product Manager (Tech)", "Project Manager (Tech)", "Technical Program Manager", "Scrum Master","Release Manager", "Site Reliability Engineer", "Platform Engineer", "Technical Writer","API Developer", "Integration Engineer", "Hardware Engineer", "Robotics Engineer","Electronics Engineer", "VLSI Engineer", "Firmware Developer", "Cloud Consultant", "IT Manager","Managing Director", "Director of Operations", "Director of Technology", "Director of Marketing","Director of Sales", "Director of Human Resources", "General Manager", "Operations Manager","Business Manager", "Program Manager", "Senior Manager", "Assistant Manager", "Branch Manager","Area Manager", "Regional Manager", "Zonal Manager", "Team Lead", "Group Manager","Sales Executive", "Sales Representative", "Sales Manager", "Area Sales Manager","Regional Sales Manager", "Zonal Sales Manager", "Territory Sales Manager", "Business Development Executive","Business Development Manager", "Business Development Associate", "Business Development Representative","Sales Associate", "Account Executive", "Account Manager", "Key Account Manager","Client Relationship Manager", "Relationship Executive", "Customer Success Manager","Tele Sales Executive", "Inside Sales Executive", "Sales Consultant", "Sales Coordinator","Sales Director", "Marketing Executive", "Marketing Manager", "Digital Marketing Executive","Digital Marketing Manager", "SEO Specialist", "SEM Specialist", "PPC Specialist","Social Media Manager", "Content Marketing Manager", "Growth Marketing Manager", "Brand Manager","Product Marketing Manager", "Event Marketing Manager", "Influencer Marketing Manager","Affiliate Marketing Manager", "Performance Marketing Manager", "Marketing Analyst","Email Marketing Specialist", "Copywriter", "Content Writer", "Creative Director","PR Manager", "Media Planner", "Advertising Manager", "Media Buyer", "Campaign Manager","Accountant", "Chartered Accountant", "Cost Accountant", "Tax Consultant", "Tax Analyst","Financial Analyst", "Investment Analyst", "Budget Analyst", "Finance Executive","Finance Manager", "Finance Controller", "Financial Planner", "Financial Advisor","Risk Analyst", "Risk Manager", "Credit Analyst", "Credit Manager", "Loan Officer","Accounts Payable Executive", "Accounts Receivable Executive", "Payroll Executive","Payroll Manager", "Bookkeeper", "Auditor", "Internal Auditor", "External Auditor","Forensic Accountant", "Finance Director", "Treasury Manager","HR Executive", "HR Manager", "HR Generalist", "HR Specialist", "HR Assistant","Talent Acquisition Executive", "Talent Acquisition Manager", "Recruitment Executive","Recruitment Manager", "Employee Relations Manager", "HR Business Partner","Compensation & Benefits Manager", "Payroll Specialist", "Training & Development Manager","L&D Specialist", "Organizational Development Manager", "HR Analyst", "HR Coordinator","HR Consultant", "HR Operations Executive", "People & Culture Manager","Operations Executive", "Operations Manager", "Operations Analyst", "Supply Chain Executive","Supply Chain Manager", "Logistics Executive", "Logistics Manager", "Inventory Manager","Warehouse Manager", "Procurement Executive", "Procurement Manager", "Purchase Executive","Purchase Manager", "Vendor Manager", "Sourcing Manager", "Fleet Manager", "Material Planner","Demand Planner", "Distribution Manager", "Import Export Executive", "Quality Control Executive","Quality Control Manager", "Plant Manager", "Manufacturing Manager", "Production Manager","Customer Service Executive", "Customer Service Representative", "Customer Care Executive","Call Center Executive", "Technical Support Executive", "Technical Support Specialist","Customer Support Analyst", "Helpdesk Executive", "Service Delivery Manager","Client Support Executive", "Chat Support Executive", "Email Support Executive","Customer Experience Manager", "Customer Retention Specialist", "Support Operations Manager","Graphic Designer", "Motion Graphics Designer", "Video Editor", "Animator", "3D Artist","3D Animator", "Visual Designer", "Creative Director", "Art Director", "Illustrator","Concept Artist", "Fashion Designer", "Interior Designer", "Industrial Designer","Product Designer", "Photographer", "Videographer", "Brand Designer", "Layout Designer", "UI Designer","Teacher", "Lecturer", "Assistant Professor", "Professor", "Academic Coordinator","Trainer", "Corporate Trainer", "Learning & Development Specialist", "Instructional Designer","Curriculum Developer", "Education Consultant", "School Counselor", "Career Counselor","Doctor", "Nurse", "Pharmacist", "Lab Technician", "Radiologist", "Medical Officer","Surgeon", "Physiotherapist", "Dentist", "Medical Representative", "Healthcare Administrator","Clinical Research Associate", "Dietitian", "Nutritionist", "Paramedic","Legal Advisor", "Lawyer", "Advocate", "Journalist", "Writer"]}
              isMultiSuggestion={false}
            />
          </div>

          {/* Expected Position Level */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Expected Position Level
            </label>

            <div className="flex gap-4 justify-center">
              {levels.map((ExpectedPosition) => (
                <label
                  key={ExpectedPosition}
                  className={`px-4 py-2 rounded-2xl cursor-pointer shadow-sm transition-all 
                    border text-sm font-medium
                    ${
                      formData.ExpectedPosition === ExpectedPosition
                        ? "bg-blue-500 text-white shadow-md border-blue-600"
                        : "bg-gray-600 text-white hover:bg-gray-700 border-gray-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="Expected Position"
                    value={ExpectedPosition}
                    onChange={handleRadioChange}
                    className="hidden"
                  />
                  {ExpectedPosition}
                </label>
              ))}
            </div>
          </div>

          {/* Full Name */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">Full Name</label>
                <input
                  type="text"
                  placeholder='abc xyz'
                  className="w-full sm:px-6 sm:p-2 border rounded peer px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-600"
                  onChange={(e) => setFormData({ ...formData, StudentName: e.target.value })}
                />
                <div className="ml-4 w-0 h-1 rounded-full bg-blue-500 transition-all duration-300 peer-hover:w-[60%] peer-focus:w-[88%] sm:peer-focus:w-[94%]"></div>
            </div>

          {/* Primary Email */}
          <button 
            onClick={handleGoogleLogin} 
            className="bg-blue-600 w-full flex justify-center text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
          >
            Continue with <FcGoogle className="ml-2 w-6 h-6" />  {/* < Need to be connect with firebase authentication */}
          </button>
              
          {/* Resume Upload */}
          <div>
            <label className="block text-sm mb-2">Upload Resume</label>
            {!formData.Resume ? (
              <div className="border-2 border-dashed border-gray-500 rounded-lg p-4 flex flex-col items-center justify-center hover:border-blue-500">
                <Upload className="w-8 h-8 mb-2 text-gray-300" />
                <p className="text-gray-400 mb-2">Drag & Drop or Click to Upload</p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resumeUpload"
                />
                <label
                  htmlFor="resumeUpload"
                  className="bg-blue-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700"
                >
                  Select File
                </label>
              </div>
            ) : (
              <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gray-800">
                <FileText className="w-6 h-6 text-green-500" />
                <p className="text-white">{formData.Resume.name}</p>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, Resume: null })}
                  className="ml-auto text-green-400 hover:text-red-600 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
        <button
          onClick={handleNext}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-lg font-semibold cursor-pointer flex items-center justify-center gap-2 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Next"
          )}
        </button>
        </form>
      </div>
    </div>
  );
}