import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaDollarSign, FaClock } from "react-icons/fa";
import axios from "axios";

function AddJobModal({ isOpen, onClose, onJobAdded, editJob }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("Full-time");

  // Prefill form when editing
  useEffect(() => {
    if (editJob) {
      setTitle(editJob.title || "");
      setCompany(editJob.company || "");
      setStatus(editJob.status || "Applied");
      setLocation(editJob.location || "");
      setSalary(editJob.salary || "");
      setJobType(editJob.jobType || "Full-time");
    } else {
      setTitle("");
      setCompany("");
      setStatus("Applied");
      setLocation("");
      setSalary("");
      setJobType("Full-time");
    }
  }, [editJob]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!title || !company)
      return alert("Please fill at least Job Title and Company!");

    // Optional: convert salary to number if needed
    const numericSalary = salary.replace(/[^0-9]/g, ""); // keep only digits

    try {
      let response;

      if (editJob) {
        // UPDATE existing job
        response = await axios.put(
          `http://localhost:5000/api/jobs/${editJob._id}`,
          {
            position: title,
            company,
            status,
            location,
            salary: numericSalary,
            jobType,
          },
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        // CREATE new job
        response = await axios.post(
          "http://localhost:5000/api/jobs",
          {
            position: title,
            company,
            status,
            location,
            salary: numericSalary,
            jobType,
          },
          { headers: { "Content-Type": "application/json" } }
        );
      }

      onJobAdded({
        _id: editJob ? editJob._id : response.data._id,
        title,
        company,
        status,
        location,
        salary: numericSalary,
        jobType,
        date: new Date().toLocaleDateString(),
      });

      onClose();
    } catch (error) {
      console.log(error);
      alert("Failed to save job. Check console.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full sm:w-96 md:w-[450px] p-6 relative animate-slide-down overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {editJob ? "Edit Job" : "Add New Job"}
        </h2>

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
              onChange={(e) => setSalary(e.target.value.replace(/[^0-9]/g, ""))} // only numbers
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="120000"
            />
          </div>

          {/* Job Type */}
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 flex items-center gap-2">
              <FaClock /> Job Type
            </label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
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
            {editJob ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddJobModal;
