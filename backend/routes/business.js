const router = require("express").Router();
const Business = require("../models/Business");
const Review = require("../models/Review"); // You must import the Review model

// GET all businesses including their approved reviews
router.get("/", async (req, res) => {
  try {
    const businesses = await Business.find().lean();
    
    // For each business, fetch its specific approved reviews
    const dataWithReviews = await Promise.all(
      businesses.map(async (biz) => {
        const reviews = await Review.find({ 
          businessId: biz._id, 
          approved: true 
        });
        return { ...biz, reviews };
      })
    );

    res.json(dataWithReviews);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newBusiness = await Business.create(req.body);
    res.json(newBusiness);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;