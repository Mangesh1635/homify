const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {
  validateReview,
  isLoggedin,
  isreviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

// post
router.post(
  "/",
  isLoggedin,
  validateReview,
  wrapAsync(reviewController.addReview)
);

//delete
router.delete(
  "/:reviewId",
  isLoggedin,
  isreviewAuthor,
  wrapAsync(reviewController.deletereview)
);

module.exports = router;
