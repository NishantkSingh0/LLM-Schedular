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
    <div className="flex justify-center items-start min-h-screen bg-gray-900 p-5">
      <div className="bg-gray-800 p-6 text-amber-50 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-4">Add Candidate Batch</h2>

        <label className="block font-semibold mb-1">Organization Requirement</label>
        <textarea
          value={orgRequirement}
          onChange={(e) => setOrgRequirement(e.target.value)}
          placeholder="Enter requirement (common for all candidates)"
          className="w-full p-2 mb-3 border border-gray-300 rounded-lg"
        />

        <label className="block font-semibold mb-1">Candidate Emails</label>
        <div>
          {emails.map((email, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                placeholder="Enter candidate email"
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addEmailField}
          className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600"
        >
          + Add Candidate
        </button>

        <button
          type="button"
          onClick={submitBatch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit Batch
        </button>
      </div>
    </div>
  );
}