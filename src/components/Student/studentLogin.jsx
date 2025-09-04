import { useState } from "react";
import Suggestions from "../Suggestions.jsx";
import { Upload, FileText } from "lucide-react";
import toast from "react-hot-toast";


export default function StudentLogin() {


  const [formData, setFormData] = useState({
    designation: "",
    level: "",
    fullName: "",
    email: "",
    resume: null,
  });

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, designation: selectedOption.value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, level: e.target.value });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, resume: file });
    } else {
      alert("Please upload a PDF file only!");
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.orgId || !formData.username || !formData.password || !formData.resume) {
      toast.error("Please fill all fields and upload a PDF resume!");
      return;
    }
    toast.success("All fields are valid!");
    // Add next step logic here
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-[90%] md:w-[60%] lg:w-[40%] m-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Login</h2>

        <form className="space-y-6" onSubmit={handleNext}>
          {/* Designation */}
          <div>
            {/* <label className="block text-sm mb-2">Designation</label> */}
            <Suggestions
              label="Designation"
              placeholder="Search your designation..."
              value={formData.designation}
              onChange={handleSelectChange}
              suggestions={["Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer","Mobile App Developer", "Web Developer", "UI/UX Designer", "UI Developer", "UX Researcher","Graphic Designer", "Game Developer", "DevOps Engineer", "Cloud Engineer", "Cloud Architect","Data Engineer", "Data Scientist", "Machine Learning Engineer", "AI Engineer", "NLP Engineer","Computer Vision Engineer", "Deep Learning Engineer", "Big Data Engineer", "Data Analyst","Business Intelligence Analyst", "Database Administrator", "System Administrator","Network Administrator", "IT Support Specialist", "IT Technician", "IT Security Analyst","Cybersecurity Specialist", "Information Security Analyst", "Security Architect","Solutions Architect", "Technical Architect", "System Architect", "Software Architect","Firmware Engineer", "Embedded Systems Engineer", "IoT Developer", "Blockchain Developer","AR/VR Developer", "Game Designer", "Technical Support Engineer", "QA Tester", "QA Analyst","QA Engineer", "Automation Tester", "Test Engineer", "Performance Test Engineer","Product Manager (Tech)", "Project Manager (Tech)", "Technical Program Manager", "Scrum Master","Release Manager", "Site Reliability Engineer", "Platform Engineer", "Technical Writer","API Developer", "Integration Engineer", "Hardware Engineer", "Robotics Engineer","Electronics Engineer", "VLSI Engineer", "Firmware Developer", "Cloud Consultant", "IT Manager","Managing Director", "Director of Operations", "Director of Technology", "Director of Marketing","Director of Sales", "Director of Human Resources", "General Manager", "Operations Manager","Business Manager", "Program Manager", "Senior Manager", "Assistant Manager", "Branch Manager","Area Manager", "Regional Manager", "Zonal Manager", "Team Lead", "Group Manager","Sales Executive", "Sales Representative", "Sales Manager", "Area Sales Manager","Regional Sales Manager", "Zonal Sales Manager", "Territory Sales Manager", "Business Development Executive","Business Development Manager", "Business Development Associate", "Business Development Representative","Sales Associate", "Account Executive", "Account Manager", "Key Account Manager","Client Relationship Manager", "Relationship Executive", "Customer Success Manager","Tele Sales Executive", "Inside Sales Executive", "Sales Consultant", "Sales Coordinator","Sales Director", "Marketing Executive", "Marketing Manager", "Digital Marketing Executive","Digital Marketing Manager", "SEO Specialist", "SEM Specialist", "PPC Specialist","Social Media Manager", "Content Marketing Manager", "Growth Marketing Manager", "Brand Manager","Product Marketing Manager", "Event Marketing Manager", "Influencer Marketing Manager","Affiliate Marketing Manager", "Performance Marketing Manager", "Marketing Analyst","Email Marketing Specialist", "Copywriter", "Content Writer", "Creative Director","PR Manager", "Media Planner", "Advertising Manager", "Media Buyer", "Campaign Manager","Accountant", "Chartered Accountant", "Cost Accountant", "Tax Consultant", "Tax Analyst","Financial Analyst", "Investment Analyst", "Budget Analyst", "Finance Executive","Finance Manager", "Finance Controller", "Financial Planner", "Financial Advisor","Risk Analyst", "Risk Manager", "Credit Analyst", "Credit Manager", "Loan Officer","Accounts Payable Executive", "Accounts Receivable Executive", "Payroll Executive","Payroll Manager", "Bookkeeper", "Auditor", "Internal Auditor", "External Auditor","Forensic Accountant", "Finance Director", "Treasury Manager","HR Executive", "HR Manager", "HR Generalist", "HR Specialist", "HR Assistant","Talent Acquisition Executive", "Talent Acquisition Manager", "Recruitment Executive","Recruitment Manager", "Employee Relations Manager", "HR Business Partner","Compensation & Benefits Manager", "Payroll Specialist", "Training & Development Manager","L&D Specialist", "Organizational Development Manager", "HR Analyst", "HR Coordinator","HR Consultant", "HR Operations Executive", "People & Culture Manager","Operations Executive", "Operations Manager", "Operations Analyst", "Supply Chain Executive","Supply Chain Manager", "Logistics Executive", "Logistics Manager", "Inventory Manager","Warehouse Manager", "Procurement Executive", "Procurement Manager", "Purchase Executive","Purchase Manager", "Vendor Manager", "Sourcing Manager", "Fleet Manager", "Material Planner","Demand Planner", "Distribution Manager", "Import Export Executive", "Quality Control Executive","Quality Control Manager", "Plant Manager", "Manufacturing Manager", "Production Manager","Customer Service Executive", "Customer Service Representative", "Customer Care Executive","Call Center Executive", "Technical Support Executive", "Technical Support Specialist","Customer Support Analyst", "Helpdesk Executive", "Service Delivery Manager","Client Support Executive", "Chat Support Executive", "Email Support Executive","Customer Experience Manager", "Customer Retention Specialist", "Support Operations Manager","Graphic Designer", "Motion Graphics Designer", "Video Editor", "Animator", "3D Artist","3D Animator", "Visual Designer", "Creative Director", "Art Director", "Illustrator","Concept Artist", "Fashion Designer", "Interior Designer", "Industrial Designer","Product Designer", "Photographer", "Videographer", "Brand Designer", "Layout Designer", "UI Designer","Teacher", "Lecturer", "Assistant Professor", "Professor", "Academic Coordinator","Trainer", "Corporate Trainer", "Learning & Development Specialist", "Instructional Designer","Curriculum Developer", "Education Consultant", "School Counselor", "Career Counselor","Doctor", "Nurse", "Pharmacist", "Lab Technician", "Radiologist", "Medical Officer","Surgeon", "Physiotherapist", "Dentist", "Medical Representative", "Healthcare Administrator","Clinical Research Associate", "Dietitian", "Nutritionist", "Paramedic","Legal Advisor", "Lawyer", "Advocate", "Journalist", "Writer"]}
              isMultiSuggestion={false}
            />
          </div>

          {/* Expected Position Level */}
          <div>
            <label className="block text-sm mb-2">Expected Position Level</label>
            <div className="flex space-x-4">
              {["I", "II", "III", "Advanced"].map((level) => (
                <label key={level} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="level"
                    value={level}
                    onChange={handleRadioChange}
                    className="form-radio text-blue-500"
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Full Name */}
            <div className="space-y-2">
                <label className="block text-sm font-medium dark:text-slate-300">Full Name</label>
                <input
                  type="text"
                  placeholder='Ram Ayodhya Singh'
                  className="w-full sm:px-6 sm:p-2 border rounded peer px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
                <div className="ml-4 w-0 h-1 rounded-full bg-blue-500 transition-all duration-300 peer-hover:w-[60%] peer-focus:w-[88%] sm:peer-focus:w-[94%]"></div>
            </div>

          {/* Primary Email */}
            <div className="space-y-2">
                <label className="block text-sm font-medium dark:text-slate-300">Primary email</label>
                <input
                  type="text"
                  placeholder='example@email.com'
                  className="w-full sm:px-6 sm:p-2 border rounded peer px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <div className="ml-4 w-0 h-1 rounded-full bg-blue-500 transition-all duration-300 peer-hover:w-[60%] peer-focus:w-[88%] sm:peer-focus:w-[94%]"></div>
            </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm mb-2">Upload Resume</label>
            {!formData.resume ? (
              <div className="border-2 border-dashed border-gray-500 rounded-lg p-6 flex flex-col items-center justify-center hover:border-blue-500">
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
                <p className="text-white">{formData.resume.name}</p>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, resume: null })}
                  className="ml-auto text-green-400 hover:text-red-600 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold cursor-pointer"
          >
            Next ➤
          </button>
        </form>
      </div>
    </div>
  );
}
