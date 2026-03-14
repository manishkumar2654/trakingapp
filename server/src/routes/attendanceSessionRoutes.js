import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createSession,
  deleteSession,
  endSession,
  getActiveSession,
  getSessions,
  updateSession,
} from "../controllers/attendanceSessionController.js";

const router = express.Router();

router.get("/", protect, getSessions);
router.get("/active", protect, getActiveSession);
router.post("/", protect, createSession);
router.put("/:id", protect, updateSession);
router.put("/:id/end", protect, endSession);
router.delete("/:id", protect, deleteSession);

export default router;