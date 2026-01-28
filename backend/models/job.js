import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  position: { type: String, required: true },
  company: { type: String, required: true },
  status: { type: String, default: "Applied" },
  location: String,
  salary: String,
  jobType: String,
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
