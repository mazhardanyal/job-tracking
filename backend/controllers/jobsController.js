import Job from "../models/job.js";

// GET ALL JOBS for logged-in user
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("GET JOBS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// CREATE JOB
export const createJob = async (req, res) => {
  try {
    const { title, company, status, location, salary, jobType } = req.body;

    if (!title || !company) {
      return res.status(400).json({ message: "Title and company are required" });
    }

    const numericSalary = salary ? Number(salary) : undefined;

    const job = await Job.create({
      title,
      company,
      status,
      location,
      salary: numericSalary,
      jobType,
      user: req.user._id,
    });

    res.status(201).json(job);
  } catch (err) {
    console.error("CREATE JOB ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE JOB
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedJob);
  } catch (err) {
    console.error("UPDATE JOB ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await job.deleteOne();
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("DELETE JOB ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
