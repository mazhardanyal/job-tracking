import express from "express";
import Job from "../models/job.js";

const router = express.Router();

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

// ADD a new job
router.post("/", async (req, res) => {
  const { position, company, status, location, salary, jobType } = req.body;

  if (!position || !company) {
    return res.status(400).json({ message: "Position and Company required" });
  }

  try {
    const job = await Job.create({ position, company, status, location, salary, jobType });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: "Failed to create job" });
  }
});

// DELETE a job
router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete job" });
  }
});

// UPDATE a job (works for Edit)
router.put("/:id", async (req, res) => {
  const { position, company, status, location, salary, jobType } = req.body;

  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { position, company, status, location, salary, jobType },
      { new: true } // return updated document
    );
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Failed to update job" });
  }
});

export default router;
