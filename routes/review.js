const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utlis/wrapAsync");
// const { reviewSchema} = require('../schema.js');
// const ExpressError = require('../utlis/ExpressError.js');
const review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validatereview, isLoginIn,isReviewAuthor} = require("../middleware");

// Reviews
// Post Review Route
router.post("/",
    isLoginIn,
    validatereview,
    wrapAsync(async(req,res)=>{
        let listing = await Listing.findById(req.params.id);
        let newReview = new review(req.body.review);

        newReview.author = req.user._id;    

        listing.reviews.push(newReview);    
        console.log(newReview);

        await newReview.save();
        await listing.save();

        req.flash("success","review added");
        res.redirect(`/listings/${listing._id}`);
    }
));

// Delete Review Route
router.delete("/:reviewId",
    isReviewAuthor,
    wrapAsync(async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId}});
    await review.findByIdAndDelete(reviewId);

    req.flash("success","review deleted");
    res.redirect(`/listings/${id}`);
}));


module.exports = router;