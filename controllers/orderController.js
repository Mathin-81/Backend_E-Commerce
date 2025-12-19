import Order from "../models/Order.js";
import Product from "../models/Products.js";
import User from "../models/User.js";

// ==============================
// CREATE ORDER (Checkout)
// ==============================
export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, total } = req.body;

    if (!items || items.length === 0 || !total) {
      return res.status(400).json({ message: "Missing order data" });
    }

    // Get user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate stock and get product details
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      
      if (product.stock < item.qty) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}` 
        });
      }

      // Reduce stock
      product.stock -= item.qty;
      await product.save();

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: item.price,
        qty: item.qty,
      });
    }

    // Create the order
    const order = await Order.create({
      userId,
      user: {
        name: user.name,
        email: user.email,
      },
      items: orderItems,
      total,
      status: "Pending",
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

// ==============================
// GET ALL ORDERS (Admin only)
// ==============================
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email") // Include user info
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ==============================
// DELETE ORDER (Admin only)
// ==============================
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ success: true, message: "Order removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete order" });
  }
};

// ==============================
// UPDATE ORDER STATUS (Admin only)
// ==============================
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ success: true, message: "Order status updated", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update order status" });
  }
};
