import Order from "../models/Order.js";

// CREATE ORDER (Checkout)
export const createOrder = async (req, res) => {
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
    res.status(500).json({ message: "Failed to create order" });
  }
};

// GET ALL ORDERS (Admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// DELETE ORDER (Admin)
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order removed" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete order" });
  }
};
