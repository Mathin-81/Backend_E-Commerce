import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

/**
 * GET all orders (Admin)
 * URL: /api/orders
 */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/**
 * CREATE order (User checkout)
 * URL: /api/orders
 */
router.post("/", async (req, res) => {
  try {
    const { user, items, total } = req.body;

    if (!user || !user.name || !user.email || !items || !total) {
      return res.status(400).json({ message: "Missing order data" });
    }

    const order = await Order.create({
      user,
      items,
      total,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to create order" });
  }
});

/**
 * DELETE order (Admin: shipped)
 * URL: /api/orders/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Order deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete order" });
  }
});

export default router;
