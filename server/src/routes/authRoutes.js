import express from "express";
import { getMe, loginUser, seedDefaultUsers } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/seed", seedDefaultUsers);

export default router;