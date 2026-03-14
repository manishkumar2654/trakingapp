import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getAllTracking,
  getLatestTrackingByEmployee,
  getMyTracking,
  updateTracking,
} from "../controllers/trackingController.js";

const router = express.Router();

router.post("/update", protect, updateTracking);
router.get("/all", protect, getAllTracking);
router.get("/latest", protect, getLatestTrackingByEmployee);
router.get("/my", protect, getMyTracking);

export default router;