import { FaEdit, FaTrash, FaMapMarkerAlt, FaClock, FaDollarSign } from "react-icons/fa";

function JobCard({ title, company, status, date, salary, location, jobType }) {
  const statusColor = {
    Applied: "from-blue-400 to-blue-600",
    Interview: "from-yellow-400 to-yellow-500",
    Rejected: "from-red-400 to-red-600",
    Hired: "from-green-400 to-green-600",
  };

  const borderColor = {
    Applied: "border-blue-500",
    Interview: "border-yellow-400",
    Rejected: "border-red-500",
    Hired: "border-green-500",
  };

  return (
    <div className={`bg-white rounded-3xl shadow-2xl border-l-8 ${borderColor[status]} p-6 flex flex-col justify-between gap-4 transform hover:scale-105 hover:shadow-3xl transition-all duration-300`}>
      
      {/* Header: Job Title + Status */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <span className={`px-4 py-1 rounded-full font-semibold text-white bg-gradient-to-r ${statusColor[status]}`}>
          {status}
        </span>
      </div>

      {/* Company & Details */}
      <div className="text-gray-600 flex flex-col gap-2 mt-2">
        <p className="text-gray-500 font-medium">{company}</p>
        
        {location && (
          <p className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-gray-500" /> {location}
          </p>
        )}

        {salary && (
          <p className="flex items-center gap-2 text-gray-600">
            <FaDollarSign className="text-gray-500" /> {salary}
          </p>
        )}

        {jobType && (
          <p className="flex items-center gap-2 text-gray-600">
            <FaClock className="text-gray-500" /> {jobType}
          </p>
        )}

        <p className="text-gray-400 text-sm flex items-center gap-2">
           Applied on: {date}
        </p>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <button className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all">
          <FaEdit /> Edit
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
}

export default JobCard;
