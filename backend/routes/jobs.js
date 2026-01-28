import express from "express";
import Job from "../models/job.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Request body:", req.body); // << log request

  const { position, company, status, location, salary, jobType } = req.body;

  if (!position || !company) {
    return res.status(400).json({ message: "Position and Company required" });
  }

  try {
    const newJob = await Job.create({
      position,
      company,
      status: status || "Applied",
      location,
      salary,
      jobType,
    });

    res.status(201).json(newJob);

  } catch (error) {
    console.error("Error creating job:", error); // << log full error
    res.status(500).json({ message: "Failed to create job", error });
  }
});

export default router;
