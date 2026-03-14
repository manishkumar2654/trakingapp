import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getOffices,
  createOffice,
  updateOffice,
  deleteOffice,
} from "../controllers/officeController.js";

const router = express.Router();

router.get("/", protect, getOffices);
router.post("/", protect, createOffice);
router.put("/:id", protect, updateOffice);
router.delete("/:id", protect, deleteOffice);

export default router;