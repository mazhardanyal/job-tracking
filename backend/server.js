import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import jobRoutes from "./routes/jobs.js";

dotenv.config();

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET","POST","PUT","DELETE"],
}));

app.use(express.json()); // parse JSON
app.use("/api/jobs", jobRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
