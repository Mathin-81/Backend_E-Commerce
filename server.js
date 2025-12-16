import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";


import contactRoutes from "./routes/contactRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import productRoutes from "./routes/productRoutes.js";



dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


// routes
app.use("/api/contact", contactRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/products", productRoutes);



const PORT = process.env.PORT || 5000;


async function start() {
try {
if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing in .env");
await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to MongoDB Atlas");


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
} catch (err) {
console.error("Failed to start server:", err);
process.exit(1);
}
}


start();