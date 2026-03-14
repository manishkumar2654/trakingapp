import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import labourRoutes from "./routes/labourRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import officeRoutes from "./routes/officeRoutes.js";
import attendanceSessionRoutes from "./routes/attendanceSessionRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Attendance System API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/labour", labourRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/offices", officeRoutes);
app.use("/api/attendance-sessions", attendanceSessionRoutes);

app.get("/api/reports/attendance", (req, res) => {
  res.json([]);
});

app.get("/api/subscription", (req, res) => {
  res.json([]);
});

export default app;