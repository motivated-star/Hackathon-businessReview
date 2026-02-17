const router = require("express").Router();
const Business = require("../models/Business");

router.get("/", async (req, res) => {
  res.json(await Business.find());
});

router.post("/", async (req, res) => {
  res.json(await Business.create(req.body));
});

module.exports = router;
