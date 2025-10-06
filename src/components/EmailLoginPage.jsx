import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function OrgLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [Details, setDetails] = useState({
    email: "",
  });
  console.log(location.state?.from, "location.state?.from===Org", location.state?.from==="Org")

  const [loading, setLoading] = useState(false); // track loading

  const handleChange = (e) => {
    setDetails({ ...Details, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    if (!Details.email) {
      if (location.state?.from==="Org"){
        toast.error("Please enter your Organization Email!");
      }
      else (location.state?.from==="Std")
        toast.error("Please enter your Personal Email!");
      return;
    }

    setLoading(true); // start loading

    if (location.state?.from==="Org"){
      try {
        const response = await fetch("http://127.0.0.1:8000/get-organization/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: Details.email }),
        });

        const result = await response.json();
        console.log("Server Response:", result);
        // console.log("Status raw:", result.status, "| type:", typeof result.status, "not_found===result.status:", "not_found"===result.status);
        if (result.status === "exists") {
          toast.success("Organization found!");
          navigate("/Organization/OrgDashboard");//, { state: result.data });
        } else if (result.status === "not_found") {
          toast.error("Organization not found. Please register!");
          navigate("/Organization", { state: { email: Details.email } });
        } else {
          toast.error("Unexpected server response!");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again later!");
      } finally {
        setLoading(false); // stop loading
      }
    }
    else{
      try {
        const response = await fetch("http://127.0.0.1:8000/get-student/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: Details.email }),
        });

        const result = await response.json();
        console.log("Server Response:", result);
        // console.log("Status raw:", result.status, "| type:", typeof result.status, "not_found===result.status:", "not_found"===result.status);
        if (result.status === "exists") {
          toast.success("Student found!");
          navigate("/verification", { state: result.data });
        } else if (result.status === "not_found") {
          toast.error("Student not found. Please register!");
          navigate("/Student", { state: { email: Details.email } });
        } else {
          toast.error("Unexpected server response!");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong. Please try again later!");
      } finally {
        setLoading(false); // stop loading
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-[500px]">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            {location.state?.from==="Org"?"Organization Primary Email":"Personal Email"}
          </label>
            <input
              type="text"
              name="email"
              placeholder="admin@example.com"
              className="w-full sm:px-6 sm:p-2 border rounded peer px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-600"
              value={Details.email}
              onChange={handleChange} // updates as user types
              onBlur={(e) => {
                const val = e.target.value;
                const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
              
                if (val && !emailRegex.test(val)) {
                  toast.error("Enter a valid Gmail address (example@gmail.com)");
                  setDetails({ ...Details, email: "" }); // clear invalid email
                }
              }}
            />
          <div className="ml-4 w-0 h-1 rounded-full bg-blue-500 transition-all duration-300 peer-hover:w-[60%] peer-focus:w-[88%] sm:peer-focus:w-[94%]"></div>
        </div>
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
      </div>
    </div>
  );
}
