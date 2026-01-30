// backend/routes/jobs.js
import express from "express";
import { createJob, updateJob, getJobs, deleteJob } from "../controllers/jobsController.js"; // <-- correct filename
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes protected
router.route("/")
  .get(protect, getJobs)      // Get jobs of logged-in user
  .post(protect, createJob);  // Create new job

router.route("/:id")
  .put(protect, updateJob)    // Edit job
  .delete(protect, deleteJob); // Delete job

export default router;
