import Contact from "../models/Contact.js";


export const submitContact = async (req, res) => {
try {
const { name, email, message } = req.body;
if (!name || !email || !message) return res.status(400).json({ error: "Missing fields" });


const saved = await Contact.create({ name, email, message });
return res.status(201).json({ success: true, data: saved });
} catch (err) {
console.error(err);
return res.status(500).json({ error: "Server error" });
}
};