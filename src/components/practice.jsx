import { useState } from "react";
import { Upload } from "lucide-react";

export default function Login() {
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({});

  const handleTypeSelect = (type) => {
    setSelectedType(type);

    // Initialize formData based on type
    if (type === "Organization") {
      setFormData({ email: "", orgName: "", ordId: "", orgType: "" });
    } else if (type === "Candidate") {
      setFormData({ interviewID: "", username: "", password: "", resume: null });
    } else if (type === "Student") {
      setFormData({ field: "", expectedPosition: "", name: "", email: "", resume: null });
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  // Build targetJSON dynamically based on selected type
  const targetJSON = {
    type: selectedType,
    data: formData
  };

  const renderOrganizationForm = () => (
    <>
      <InputField
        label="Organization Email"
        type="email"
        placeholder="admin@org.com"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      <InputField
        label="Organization Name"
        type="text"
        placeholder="ABC Pvt Ltd"
        value={formData.orgName}
        onChange={(e) => handleChange("orgName", e.target.value)}
      />
      
      <InputField
        label="Build a Unique OrgId"
        type="text"
        placeholder="xyz.ische"
        value={formData.ordId}
        onChange={(e) => handleChange("ordId", e.target.value)}
      />

      {/* Type of Organization */}
      <div className="space-y-2 mb-4">
        <label className="block text-sm font-medium text-slate-300">
          Organization Type
        </label>
        <select
          className="w-full border-2 rounded px-3 py-2 cursor-pointer bg-gray-800 text-white border-blue-600"
          value={formData.orgType}
          onChange={(e) => handleChange("orgType", e.target.value)}
        >
          <option value="">Select</option>
          <option value="Startup">Startup</option>
          <option value="Growing">Growing</option>
          <option value="Matured">Matured</option>
          <option value="Enterprise">Enterprise</option>
        </select>
      </div>
    </>
  );

  const renderCandidateForm = () => (
    <>
      <InputField
        label="Org ID"
        type="text"
        placeholder="INT1234"
        value={formData.interviewID}
        onChange={(e) => handleChange("interviewID", e.target.value)}
      />
      <InputField
        label="Username"
        type="text"
        placeholder="candidate123"
        value={formData.username}
        onChange={(e) => handleChange("username", e.target.value)}
      />
      <InputField
        label="Password"
        type="password"
        placeholder="********"
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />
      {renderFileUpload()}
    </>
  );

  const renderStudentForm = () => (
    <>
      {/* Field Select */}
      <div className="space-y-2 mb-4">
        <label className="block text-sm font-medium text-slate-300">
          Choose Your Designation
        </label>
        <select
          className="w-full border rounded px-3 py-2 bg-gray-800 text-white border-gray-600"
          value={formData.field}
          onChange={(e) => handleChange("field", e.target.value)}
        >
          <option value="">Select Field</option>
          <option value="Data Science">Data Science</option>
          <option value="FullStack Development">FullStack Development</option>
          <option value="HR">HR</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Cloud Engineering">Cloud Engineering</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="AI & ML">AI & ML</option>
        </select>
      </div>

      {/* Expected Position - Radio Buttons */}
      <div className="space-y-2 mb-4">
        <label className="block text-sm font-medium text-slate-300">
          Expected Position Level
        </label>
        <div className="flex flex-wrap gap-4 ml-4 text-blue-50">
          {["I", "II", "III", "Advanced"].map((level) => (
            <label key={level} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="expectedPosition"
                value={level}
                checked={formData.expectedPosition === level}
                onChange={(e) => handleChange("expectedPosition", e.target.value)}
                className="accent-blue-600"
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      {/* Full Name */}
      <InputField
        label="Full Name"
        type="text"
        placeholder="Ram ayodhya singh"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      {/* Email */}
      <InputField
        label="Primary Email"
        type="email"
        placeholder="student@example.com"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />

      {renderFileUpload()}
    </>
  );

  const renderFileUpload = () => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-300 mb-2">
        Upload Your Resume
      </label>
      <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center hover:border-blue-500 transition">
        <Upload size={40} className="text-blue-500 mb-2" />
        <p className=" text-gray-300 mb-2">
          Drag & Drop or Click to Upload
        </p>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          id="file-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="text-blue-600 cursor-pointer">
          Browse Files
        </label>
      </div>
      {formData.resume && (
        <p className="mt-2 text-sm text-green-500">{formData.resume.name}</p>
      )}
    </div>
  );

  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-gray-900 p-6">
      {!selectedType && (
        <div className="grid gap-6">
          {["Organization", "Candidate", "Student"].map((type) => (
            <div
              key={type}
              className="bg-blue-500 text-white rounded-2xl shadow-lg p-6 cursor-pointer hover:scale-105 transition"
              onClick={() => handleTypeSelect(type)}
            >
              <h2 className="text-xl font-semibold text-center">{type}</h2>
              {/* {type === "Organization" && <p>Hlwo</p>}
              {type === "Candidate" && <p>renderCandidateForm()</p>}
              {type === "Student" && <p>renderStudentForm()</p>} */}
            </div>
          ))}
        </div>
      )}

      {selectedType && (
        <div className="w-full max-w-lg bg-gray-800 shadow-xl rounded-xl p-6 mt-6">
          {/* <div className="text-white">⇦</div> */}
          <h2 className="text-2xl font-semibold mb-4 text-white">
            {selectedType} Form
          </h2>

          {selectedType === "Organization" && renderOrganizationForm()}
          {selectedType === "Candidate" && renderCandidateForm()}
          {selectedType === "Student" && renderStudentForm()}

          <button
            onClick={() => console.log(targetJSON)}
            className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Next ➤
          </button>
        </div>
      )}
    </div>
  );
}

function InputField({ label, type, placeholder, value, onChange }) {
  return (
    <div className="space-y-2 mb-4">
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-bg-gray-800 text-white border-gray-600"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
