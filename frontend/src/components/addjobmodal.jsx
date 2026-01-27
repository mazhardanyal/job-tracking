import { useState } from "react";
import { FaMapMarkerAlt, FaDollarSign, FaClock } from "react-icons/fa";

function AddJobModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title || !company) return alert("Please fill at least Job Title and Company!");
    onSave({ title, company, status, location, salary, jobType, date: new Date().toISOString().split("T")[0] });
    setTitle(""); setCompany(""); setStatus("Applied"); setLocation(""); setSalary(""); setJobType("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full sm:w-96 md:w-[450px] p-6 relative animate-slide-down overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New Job</h2>

        <div className="flex flex-col gap-4">
          {/* Job Title */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Frontend Developer"
            />
          </div>

          {/* Company */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Google"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Rejected</option>
              <option>Hired</option>
            </select>
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <FaMapMarkerAlt /> Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="San Francisco, CA"
            />
          </div>

          {/* Salary */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <FaDollarSign /> Salary
            </label>
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="$120,000"
            />
          </div>

          {/* Job Type */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <FaClock /> Job Type
            </label>
            <input
              type="text"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Full-time / Part-time / Contract"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddJobModal;
