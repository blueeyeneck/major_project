const review = require("../models/reviews.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new review(req.body.review);

    newReview.author = req.user._id;    

    listing.reviews.push(newReview);    
    console.log(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success","review added");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview =async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId}});
    await review.findByIdAndDelete(reviewId);

    req.flash("success","review deleted");
    res.redirect(`/listings/${id}`);
};