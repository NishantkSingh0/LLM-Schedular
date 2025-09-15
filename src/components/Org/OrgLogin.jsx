import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function OrgLogin() {
  const navigate = useNavigate();
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
    // navigate("/organization/pay", { state: orgDetails });
    navigate('/Interview')
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Organization Details
        </h1>
          <div className="space-y-2">
            <label className="block text-sm font-medium dark:text-slate-300">Create a unique OrgId</label>
            <input
              type="text"
              name="orgId"
              placeholder='Organization ID'
              className="w-full sm:px-6 sm:p-2 border rounded peer px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
              value={orgDetails.orgId}
              onChange={handleChange}
            />
            <div className="ml-4 w-0 h-1 rounded-full bg-blue-500 transition-all duration-300 peer-hover:w-[60%] peer-focus:w-[88%] sm:peer-focus:w-[94%]"></div>
          </div>
          <div className="space-y-2">
              <label className="block text-sm font-medium dark:text-slate-300">Organization Name</label>
              <input
                type="text"
                name="orgName"
                placeholder='xyz pvt ltd'
                className="w-full sm:px-6 sm:p-2 border rounded peer px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                value={orgDetails.orgName}
                onChange={handleChange}
              />
              <div className="ml-4 w-0 h-1 rounded-full bg-blue-500 transition-all duration-300 peer-hover:w-[60%] peer-focus:w-[88%] sm:peer-focus:w-[94%]"></div>
          </div>
          <div className="space-y-2">
              <label className="block text-sm font-medium dark:text-slate-300">Organization Email</label>
              <input
                type="text"
                name="orgEmail"
                placeholder='admin@example.com'
                className="w-full sm:px-6 sm:p-2 border rounded peer px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                value={orgDetails.orgEmail}
                onChange={handleChange}
              />
              <div className="ml-4 w-0 h-1 rounded-full bg-blue-500 transition-all duration-300 peer-hover:w-[60%] peer-focus:w-[88%] sm:peer-focus:w-[94%]"></div>
          </div>
          <div>
            <label className="block text-sm mb-2">Organization Type</label>
            <div className="flex space-x-4">
              {["Startup", "Growing", "Mature", "Enterprise"].map((level) => (
                <label key={level} className="flex items-center cursor-pointer space-x-2">
                  <input
                    type="radio"
                    name="orgType"
                    value={level}
                    onChange={handleRadioChange}
                    className="form-radio text-blue-500"
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
          </div>
        <button
          onClick={handleNext}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold cursor-pointer"
        >
          Next ➤
        </button>
      </div>
    </div>
  );
}
