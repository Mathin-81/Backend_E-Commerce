import express from "express";
import { createOrder, getOrders, deleteOrder, updateOrderStatus } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, adminMiddleware, getOrders);
router.delete("/:id", authMiddleware, adminMiddleware, deleteOrder);
router.put("/:id/status", authMiddleware, adminMiddleware, updateOrderStatus);

export default router;
