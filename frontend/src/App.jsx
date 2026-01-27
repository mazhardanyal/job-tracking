import { useState } from "react";
import Header from "./components/Header";
import JobCard from "./components/jobcard";
import AddJobModal from "./components/addjobmodal";

function App() {
  const [jobs, setJobs] = useState([
    { title: "Frontend Developer", company: "Google", status: "Applied", date: "2026-01-25" ,location:"lahore", salary:"50k",JobType:"Onsite"},
  
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddJob = () => setIsModalOpen(true);
  const handleSaveJob = (job) => setJobs([job, ...jobs]);

  const userImage = "https://i.pravatar.cc/150?img=3";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <Header onAdd={handleAddJob} userImage={userImage} />

      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {jobs.map((job, i) => (
          <JobCard key={i} {...job} />
        ))}
      </main>

      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveJob}
      />
    </div>
  );
}

export default App;
