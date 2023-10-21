const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utlis/wrapAsync");
// const { reviewSchema} = require('../schema.js');
// const ExpressError = require('../utlis/ExpressError.js');
// const review = require("../models/reviews.js");
// const Listing = require("../models/listing.js");
const {validatereview, isLoginIn,isReviewAuthor} = require("../middleware");

const reviewController = require("../controllers/reviews");

// Reviews
// Post Review Route
router.post("/",isLoginIn,validatereview,wrapAsync(reviewController.createReview));

// Delete Review Route
router.delete("/:reviewId",isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;