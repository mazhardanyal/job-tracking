import { useState } from "react";
import Header from "./components/header";
import JobCard from "./components/jobcard";
import AddJobModal from "./components/addjobmodal";
import JobSummary from "./components/jobsummary";
import JobFilter from "./components/jobfilter";
import ProfileModal from "./components/profilemodal"; // <--- Import ProfileModal

function App() {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // <--- Profile modal state
  const [filter, setFilter] = useState("All");

  const handleAddJob = () => setIsModalOpen(true);
  const handleSaveJob = (job) => setJobs([job, ...jobs]);

  const userImage = "https://i.pravatar.cc/150?img=3";

  const user = {
    name: "Mazhar Khan",
    email: "mazhar@example.com",
    image: userImage,
    stats: {
      applied: jobs.length,
      hired: jobs.filter((j) => j.status === "Hired").length,
      interview: jobs.filter((j) => j.status === "Interview").length,
      rejected: jobs.filter((j) => j.status === "Rejected").length,
    },
  };

  // Filtered jobs based on selected filter
  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header */}
      <Header
        onAdd={handleAddJob}
        userImage={userImage}
        onProfileClick={() => setIsProfileOpen(true)} // <--- Add profile click handler
      />

      <main className="p-6">
        {/* Job Summary */}
        <JobSummary jobs={jobs} />

        {/* Filters */}
        <JobFilter currentFilter={filter} setFilter={setFilter} />

        {/* Job Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredJobs.map((job, i) => (
            <JobCard key={i} {...job} />
          ))}
        </div>
      </main>

      {/* Add Job Modal */}
      <AddJobModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onJobAdded={handleSaveJob} // <-- use the correct name
/>


      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
      />
    </div>
  );
}

export default App;
