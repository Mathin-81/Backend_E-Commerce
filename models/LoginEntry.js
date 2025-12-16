import mongoose from "mongoose";


const loginSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true },
password: { type: String, required: true },
createdAt: { type: Date, default: Date.now }
});


export default mongoose.model("LoginEntry", loginSchema);