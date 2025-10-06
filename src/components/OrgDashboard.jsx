import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const OrgDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Sample backend-style JSON test data
  const candNames = [
    ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Charlie Brown'],
    ['David Lee', 'Eva Green', 'Frank White', 'Charlie Brown'],
    ['Grace Kim', 'Henry Ford', 'Isabella Cruz', 'Charlie Brown'],
  ];

  const candScores = [
    [
      [85, 92, 88],
      [78, 80, 75],
      [90, 95, 92],
      [90, 95, 92],
    ],
    [
      [70, 75, 72],
      [88, 86, 90],
      [60, 68, 65],
      [88, 86, 90],
    ],
    [
      [95, 97, 96],
      [84, 89, 85],
      [95, 97, 96],
      [73, 77, 75],
    ],
  ];

  const resumeInfos = [
    [
      'Frontend Developer – React & Tailwind',
      'Backend Developer – Node.js & Express',
      'Full Stack Developer – MERN Stack',
      'Backend Developer – Node.js & Express',
    ],
    [
      'UI/UX Designer – Figma Expert',
      'QA Engineer – Selenium & Cypress',
      'Data Analyst – Power BI & SQL',
      'QA Engineer – Selenium & Cypress',
    ],
    [
      'ML Engineer – Python & TensorFlow',
      'DevOps Engineer – AWS & Docker',
      'ML Engineer – Python & TensorFlow',
      'Cybersecurity Analyst – Network Security',
    ],
  ];

  const batches = candNames;

  const handleAddBatch = () => {
    navigate('/Organization/Add_Candidates');
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white font-sans">
      {/* Sidebar */}
      <div
        className={`${menuOpen ? 'w-56' : 'w-16'} bg-gray-900 p-4 transition-all duration-300 flex flex-col fixed top-0 left-0 h-full shadow-lg`}
      >
        {/* Menu Icon shifted to the left */}
        <div className="flex items-center justify-start mb-6 border-b border-gray-800 pb-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-indigo-400 focus:outline-none ml-0"
          >
            <Menu size={26} />
          </button>
        </div>

        {/* Batch Buttons */}
        <div className="flex-1 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-700">
          {batches.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedBatch(index)}
              className={`w-full text-left px-2 md:px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-gray-800 focus:outline-none truncate ${
                selectedBatch === index ? 'bg-indigo-700 text-white' : 'bg-gray-900 text-gray-300'
              }`}
            >
              {`Batch ${index + 1}`}
            </button>
          ))}
        </div>

        {/* Add Batch Button */}
        <div className="mt-4 border-t border-gray-800 pt-3">
          <button
            onClick={handleAddBatch}
            className="w-full text-center bg-indigo-600 hover:bg-indigo-700 px-2 md:px-4 py-2 rounded-lg transition-all text-sm font-medium truncate"
          >
            + Add Batch
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-56 p-8 transition-all duration-300">
        <h1 className="text-3xl font-semibold mb-6 text-indigo-400 tracking-wide">
          Candidate Dashboard - Batch {selectedBatch + 1}
        </h1>

        <div className="overflow-x-auto rounded-xl border border-gray-800 shadow-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-900 text-indigo-400">
              <tr>
                <th className="px-6 py-3 text-left uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left uppercase tracking-wider">Scores</th>
                <th className="px-6 py-3 text-left uppercase tracking-wider">Resume Information</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {candNames[selectedBatch].map((name, idx) => (
                <tr key={idx} className="hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-3 font-medium text-gray-200">{name}</td>
                  <td className="px-6 py-3 text-gray-300">
                    {candScores[selectedBatch][idx].join(', ')}
                  </td>
                  <td className="px-6 py-3 text-gray-400">
                    {resumeInfos[selectedBatch][idx]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrgDashboard;

