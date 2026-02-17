const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  await User.create({ ...req.body, password: hashed });
  res.send("Registered");
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.sendStatus(401);
  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.sendStatus(401);
  const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
  res.json({ token, role: user.role });
});

module.exports = router;
