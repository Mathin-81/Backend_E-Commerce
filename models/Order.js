import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    items: [
      {
        name: String,
        price: Number,
        qty: Number,
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
