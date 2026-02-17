const router = require("express").Router();
const Review = require("../models/Review");
const Business = require("../models/Business");

router.post("/", async (req, res) => {
  res.json(await Review.create(req.body));
});

router.get("/pending", async (req, res) => {
  res.json(await Review.find({ approved: false }));
});

router.post("/approve/:id", async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, { approved: true });
  const reviews = await Review.find({ businessId: review.businessId, approved: true });
  const avg = reviews.reduce((a,b)=>a+b.rating,0)/reviews.length;
  await Business.findByIdAndUpdate(review.businessId,{ avgRating: avg });
  res.send("Approved");
});

module.exports = router;
