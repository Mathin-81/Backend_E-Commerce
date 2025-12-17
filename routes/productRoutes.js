import express from "express";
import Product from "../models/Products.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * GET all products
 * PUBLIC
 * URL: /api/products
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

/**
 * POST add product
 * ADMIN ONLY
 * URL: /api/products
 */
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { name, price, category, img, rating } = req.body;

    if (!name || !price || !category || !img) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = new Product({
      name,
      price,
      category,
      img,
      rating,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Failed to add product" });
  }
});

/**
 * DELETE product by ID
 * ADMIN ONLY
 * URL: /api/products/:id
 */
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});

export default router;
