import Contact from "../models/Contact.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const saved = await Contact.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Message sent",
      data: saved,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit message" });
  }
};

export const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};
