import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    position: { type: String, required: true },
    company: { type: String, required: true },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Hired", "Rejected"],
      default: "Applied",
    },
    location: String,
    salary: String,
    jobType: String,
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
