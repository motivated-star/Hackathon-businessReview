// backend/routes/auth.js
const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10); // Hash password
  await User.create({ ...req.body, password: hashed }); // Save user
  res.send("Registered");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  // ADD THIS: Compare passwords
  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
  res.json({ token, user });
});

module.exports = router;