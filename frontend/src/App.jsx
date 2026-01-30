import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/header";
import JobCard from "./components/jobcard";
import AddJobModal from "./components/addjobmodal";
import JobSummary from "./components/jobsummary";
import JobFilter from "./components/jobfilter";
import ProfileModal from "./components/profilemodal";
import AuthModal from "./components/authmodal";

function App() {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [editJob, setEditJob] = useState(null);
  const [user, setUser] = useState(null);

  const userImage = "https://i.pravatar.cc/150?img=3";

  // Fetch jobs
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

  // Fetch profile if token exists
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({
          ...res.data,
          image: userImage,
          stats: {
            applied: jobs.length,
            hired: jobs.filter((j) => j.status === "Hired").length,
            interview: jobs.filter((j) => j.status === "Interview").length,
            rejected: jobs.filter((j) => j.status === "Rejected").length,
          },
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [jobs]);

  // Protect app: show AuthModal if not logged in
  if (!user) {
    return (
      <AuthModal
        isOpen={true}
        onClose={() => {}}
        setUser={setUser}
      />
    );
  }

  // Add, edit, delete, save jobs
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

    // Update user stats
    setUser((prevUser) => ({
      ...prevUser,
      stats: {
        applied: prevUser.stats.applied + 1,
        hired: jobs.filter((j) => j.status === "Hired").length,
        interview: jobs.filter((j) => j.status === "Interview").length,
        rejected: jobs.filter((j) => j.status === "Rejected").length,
      },
    }));
  };

  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.status === filter);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header */}
      <Header
        onAdd={handleAddJob}
        userImage={user?.image || userImage}
        onProfileClick={() => setIsProfileOpen(true)}
      />

      {/* Main */}
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

      {/* Modals */}
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
        setUser={setUser}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default App;
