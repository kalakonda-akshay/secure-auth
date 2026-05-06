import express from "express";
import { getUsers } from "../controllers/adminController.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getUsers);

export default router;
