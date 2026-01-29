function JobSummary({ jobs = [] }) {
  const counts = {
    Applied: jobs.filter(j => j.status === "Applied").length,
    Interview: jobs.filter(j => j.status === "Interview").length,
    Hired: jobs.filter(j => j.status === "Hired").length,
    Rejected: jobs.filter(j => j.status === "Rejected").length,
  };

  const statusColor = {
    Applied: "bg-blue-500",
    Interview: "bg-yellow-400",
    Hired: "bg-green-500",
    Rejected: "bg-red-500",
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {Object.keys(counts).map((status) => (
        <div
          key={status}
          className={`flex flex-col items-center p-4 rounded-2xl shadow-lg ${statusColor[status]} text-white`}
        >
          <span className="text-2xl font-bold">{counts[status]}</span>
          <span>{status}</span>
        </div>
      ))}
    </div>
  );
}

export default JobSummary;
