import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/header";
import JobCard from "./components/jobcard";
import AddJobModal from "./components/addjobmodal";
import JobSummary from "./components/jobsummary";
import JobFilter from "./components/jobfilter";
import ProfileModal from "./components/profilemodal";

function App() {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [editJob, setEditJob] = useState(null);

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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        const mappedJobs = res.data.map((job) => ({
          _id: job._id,
          title: job.position,
          company: job.company,
          status: job.status,
          location: job.location,
          salary: job.salary,
          jobType: job.jobType,
          date: new Date(job.createdAt).toLocaleDateString(),
        }));
        setJobs(mappedJobs);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJobs();
  }, []);

  const handleAddJob = () => setIsModalOpen(true);

  const handleEditJob = (job) => {
    setEditJob(job);
    setIsModalOpen(true);
  };

  const handleDeleteJob = async (_id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${_id}`);
      setJobs(jobs.filter((j) => j._id !== _id));
    } catch (err) {
      console.log(err);
      alert("Failed to delete job.");
    }
  };

  const handleSaveJob = (job) => {
    setJobs((prevJobs) => {
      const index = prevJobs.findIndex((j) => j._id === job._id);
      if (index !== -1) {
        const updatedJobs = [...prevJobs];
        updatedJobs[index] = job;
        return updatedJobs;
      } else {
        return [job, ...prevJobs];
      }
    });
    setEditJob(null);
  };

  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <Header
        onAdd={handleAddJob}
        userImage={userImage}
        onProfileClick={() => setIsProfileOpen(true)}
      />

      <main className="p-6">
        <JobSummary jobs={jobs} />
        <JobFilter currentFilter={filter} setFilter={setFilter} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              {...job}
              onDelete={handleDeleteJob}
              onEdit={handleEditJob}
            />
          ))}
        </div>
      </main>

      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditJob(null);
        }}
        onJobAdded={handleSaveJob}
        editJob={editJob}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
      />
    </div>
  );
}

export default App;
