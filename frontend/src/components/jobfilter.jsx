function JobFilter({ currentFilter, setFilter }) {
  const filters = ["All", "Applied", "Interview", "Hired", "Rejected"];

  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-3 mb-6 overflow-x-auto">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setFilter(filter)}
          className={`flex-shrink-0 px-4 py-2 rounded-full border transition-all ${
            currentFilter === filter
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default JobFilter;
