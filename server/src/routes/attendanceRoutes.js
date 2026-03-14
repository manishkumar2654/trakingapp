import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getActiveSession,
  getAttendanceLogs,
  getMyAttendance,
  markAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/active-session", protect, getActiveSession);
router.get("/logs", protect, getAttendanceLogs);
router.get("/my", protect, getMyAttendance);
router.post("/mark", protect, markAttendance);

export default router;