import express from "express";
import { registerUser, loginUser, getUsers, deleteUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", authMiddleware, adminMiddleware, getUsers);
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;