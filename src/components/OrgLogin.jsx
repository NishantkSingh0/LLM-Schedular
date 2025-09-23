import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function OrgLogin() {
  const navigate = useNavigate();
  const levels=["Startup", "Growing", "Mature", "Enterprise"]
  const [orgDetails, setOrgDetails] = useState({
    orgId: "",
    orgName: "",
    orgEmail: "",
    orgType: "",
  });

  const handleChange = (e) => {
    setOrgDetails({ ...orgDetails, [e.target.name]: e.target.value });
  };
  const handleRadioChange = (e) => {
    setOrgDetails({ ...orgDetails, orgType: e.target.value });
  };

  const handleNext = () => {
    if (!orgDetails.orgId || !orgDetails.orgName || !orgDetails.orgEmail || !orgDetails.orgType) {
      toast.error("Please fill all fields and upload a PDF resume!");
      return;
    }
    console.log(orgDetails)
    // toast.success("Form Filled successfully. But nothing to naviagete")
    // navigate("/organization/pay", { state: orgDetails });
    navigate('/Organization/Add_Candidates')
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-[500px]">
        <h1 className="text-2xl font-bold text-center mb-6">
          Organization Details
        </h1>
          <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium">Organization Name</label>
              <input
                type="text"
                name="orgName"
                placeholder='xyz pvt ltd'
                className="w-full sm:px-6 sm:p-2 border rounded peer px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-600"
                value={orgDetails.orgName}
                onChange={handleChange}
              />
              <div className="ml-4 w-0 h-1 rounded-full bg-blue-500 transition-all duration-300 peer-hover:w-[60%] peer-focus:w-[88%] sm:peer-focus:w-[94%]"></div>
          </div>
          <div className="space-y-2 mb-4">
            <label className="block text-sm font-medium">Create a unique OrgId</label>
            <input
              type="text"
              name="orgId"
              placeholder='xyz@1'
              className="w-full sm:px-6 sm:p-2 border rounded peer px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-600"
              value={orgDetails.orgId}
              onChange={handleChange}
            />
            <div className="ml-4 w-0 h-1 rounded-full bg-blue-500 transition-all duration-300 peer-hover:w-[60%] peer-focus:w-[88%] sm:peer-focus:w-[94%]"></div>
          </div>
          <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium">Organization Email</label>
              <input
                type="text"
                name="orgEmail"
                placeholder='admin@example.com'
                className="w-full sm:px-6 sm:p-2 border rounded peer px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-600"
                value={orgDetails.orgEmail}
                onChange={handleChange}
              />
              <div className="ml-4 w-0 h-1 rounded-full bg-blue-500 transition-all duration-300 peer-hover:w-[60%] peer-focus:w-[88%] sm:peer-focus:w-[94%]"></div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Organization Type
            </label>

            <div className="flex gap-3 justify-center">
              {levels.map((orgType) => (
                <label
                  key={orgType}
                  className={`px-4 py-2 rounded-2xl cursor-pointer shadow-sm transition-all 
                    border text-sm font-medium
                    ${
                      orgDetails.orgType === orgType
                        ? "bg-blue-500 text-white shadow-md border-blue-600"
                        : "bg-gray-600 text-white hover:bg-gray-700 border-gray-300"
                    }`}
                >
                  <input
                    type="radio"
                    name="orgType"
                    value={orgType}
                    onChange={handleRadioChange}
                    className="hidden"
                  />
                  {orgType}
                </label>
              ))}
            </div>
          </div>
        <button
          onClick={handleNext}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold cursor-pointer"
        >
          Next 
        </button>
      </div>
    </div>
  );
}
