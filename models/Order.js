import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

/**
 * POST - create order (Checkout)
 * /api/orders
 */
router.post("/", async (req, res) => {
  try {
    const { user, email, items, total } = req.body;

    if (!user || !email || !items || !total) {
      return res.status(400).json({ message: "Missing order data" });
    }

    const order = await Order.create({ user, email, items, total });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to create order" });
  }
});

/**
 * GET - all orders (Admin)
 * /api/orders
 */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/**
 * DELETE - remove order (Admin)
 * /api/orders/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete order" });
  }
});

export default router;
