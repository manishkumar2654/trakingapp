import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  addLabour,
  allLabour,
  myLabour,
  updateLabour,
  deleteLabour,
} from "../controllers/labourController.js";

const router = express.Router();

router.post("/", protect, addLabour);
router.get("/", protect, allLabour);
router.get("/my", protect, myLabour);
router.put("/:id", protect, updateLabour);
router.delete("/:id", protect, deleteLabour);

export default router;