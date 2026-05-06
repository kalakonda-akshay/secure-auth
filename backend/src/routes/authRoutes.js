import express from "express";
import { getMe, login, logout, refreshSession, register } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/refresh", refreshSession);
router.post("/logout", logout);

export default router;
