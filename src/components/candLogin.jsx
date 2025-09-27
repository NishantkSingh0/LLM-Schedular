import { useState } from "react";
import { Upload, FileText } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import ScreenWarning from './NoMob.jsx';
import toast from "react-hot-toast";

export default function CandidateLogin() {
  const [formData, setFormData] = useState({
    orgId: "",
    username: "",
    password: "",
    resume: null,
  });

  if (window.innerWidth < 1024) {
    return <ScreenWarning />;  // Smaller screens not allowed
  }

  const navigate=useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData({ ...formData, resume: file });
    } else {
      alert("Please upload a PDF file only!");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // toast.success("LogedIn");
    console.log(formData);
    navigate('/verification')
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.orgId || !formData.username || !formData.password || !formData.resume) {
      toast.error("Please fill all fields and upload a PDF resume!");
      return;
    }
    // toast.success("All fields are valid!");
    // Add next step logic here
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="bg-gray-800 p-6 m-6 rounded-2xl shadow-lg w-[500px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Candidate Login</h2>

        <form className="space-y-2" onSubmit={handleNext}>
            {/* Org ID */}
            <div className="space-y-2">
                <label className="block text-sm font-medium">Org Id</label>
                <input
                  type="text"
                  name="orgId"
                  placeholder='Enter Org ID'
                  className="w-full px-6 p-2 border rounded peer focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-600"
                  onChange={handleChange}
                />
                <div className="ml-4 w-0 h-1 rounded-full bg-blue-500 transition-all duration-300 peer-hover:w-[60%] peer-focus:w-[88%] sm:peer-focus:w-[94%]"></div>
            </div>


            {/* Username */}
            <div className="space-y-2">
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder='Enter your username'
                  className="w-full sm:px-6 sm:p-2 border rounded peer px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-600"
                  onChange={handleChange}
                />
                <div className="ml-4 w-0 h-1 rounded-full bg-blue-500 transition-all duration-300 peer-hover:w-[60%] peer-focus:w-[88%] sm:peer-focus:w-[94%]"></div>
            </div>


            {/* Password */}
            <div className="space-y-2">
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder='Enter your password'
                  className="w-full sm:px-6 sm:p-2 border rounded peer px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-600"
                  onChange={handleChange}
                />
                <div className="ml-4 w-0 h-1 rounded-full bg-blue-500 transition-all duration-300 peer-hover:w-[60%] peer-focus:w-[88%] sm:peer-focus:w-[94%]"></div>
            </div>


            {/* Resume Upload */}
            <div>
              <label className="block text-sm mb-2">Upload Resume</label>
              {!formData.resume ? (
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
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold cursor-pointer"
            >
              Next 
            </button>
        </form>
      </div>
    </div>
  );
}
