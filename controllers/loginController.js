import LoginEntry from "../models/LoginEntry.js";


export const submitLogin = async (req, res) => {
try {
const { name, email, password } = req.body;
if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });


const saved = await LoginEntry.create({ name, email, password });
return res.status(201).json({ success: true, data: saved });
} catch (err) {
console.error(err);
return res.status(500).json({ error: "Server error" });
}
};