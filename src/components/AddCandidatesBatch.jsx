import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddCandidateBatch() {
  const [orgRequirement, setOrgRequirement] = useState("");
  const [emails, setEmails] = useState([""]); // start with one empty field
  const [batchCount, setBatchCount] = useState(1);

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

  const addEmailField = () => {
    setEmails([...emails, ""]);
  };

  const submitBatch = () => {
    const trimmedRequirement = orgRequirement.trim();
    const validEmails = emails.map(e => e.trim()).filter(e => e !== "");

    if (!trimmedRequirement) {
      toast.error("Please enter the organization requirement.");
      return;
    }
    if (validEmails.length === 0) {
      toast.error("Please add at least one candidate email.");
      return;
    }

    const batchKey = `Group${batchCount}`;
    const newBatch = {
      [batchKey]: {
        OrgRequirement: trimmedRequirement,
        Candidates: validEmails,
      },
    };

    // Store in localStorage (replace later with Firebase)
    const storedData = JSON.parse(localStorage.getItem("candidateBatches")) || {};
    const updatedData = { ...storedData, ...newBatch };
    localStorage.setItem("candidateBatches", JSON.stringify(updatedData));

    // Simulate sending emails
    validEmails.forEach(email => {
      console.log(`📩 Sample Mail Sent to: ${email} | Requirement: ${trimmedRequirement}`);
    });


    toast.success(`Batch ${batchKey} submitted successfully! ${validEmails.length} invitations prepared.`);

    // Reset form
    setOrgRequirement("");
    setEmails([""]);
    setBatchCount(prev => prev + 1);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-950 text-white p-4">
      <div className="w-full md:w-4/5 lg:w-4/5 xl:w-4/5 bg-blue-900 p-6 rounded-lg shadow-lg">

        {/* Organization's Requirement Section */}
        <div className="bg-blue-800 border-2 border-gray-500 p-4 rounded-md mb-6">
          <h2 className="text-lg font-bold mb-3">Organization's Requirement</h2>
          <textarea
            value={orgRequirement}
            onChange={(e) => setOrgRequirement(e.target.value)}
            placeholder="Describe the role's responsibilities and expectations"
            className="w-full h-40 p-3 bg-blue-950 border border-gray-500 rounded-md text-white placeholder-blue-300 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Candidate Email Section */}
        <div className="bg-blue-800 border-2 border-gray-500 p-4 rounded-md mb-4">
          <h2 className="text-lg font-bold mb-3">Candidate's Email</h2>
          {emails.map((email, index) => (
            <div key={index} className="mb-4">
              <label className="block text-blue-300 mb-1">Candidate {index + 1}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                placeholder="Enter candidate's email"
                className="w-full p-3 bg-blue-950 border border-gray-500 rounded-md text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Both add and submit  Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={addEmailField}
            className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold border-2 border-transparent hover:border-green-400 hover:bg-green-600 transition-colors focus:outline-none"          
            >
            + Add Candidate
          </button>
          <button
            type="button"
            onClick={submitBatch}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold border-2 border-transparent hover:border-blue-400 hover:bg-blue-700 transition-colors focus:outline-none"          
            >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}