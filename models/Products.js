import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    img: { type: String, required: true },
    rating: { type: Number, default: 4 },
    stock: { type: Number, default: 50 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
