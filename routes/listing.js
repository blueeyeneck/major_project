const express = require('express');
const router = express.Router();
const wrapAsync = require('../utlis/wrapAsync.js');
// const { listingSchema } = require('../schema.js');
// const ExpressError = require('../utlis/ExpressError.js');
const Listing = require("../models/listing.js");
const user = require("../models/user.js");
const {isLoginIn,isOwner,validateListing} = require("../middleware.js");


// Index Route
router.get("/",wrapAsync(async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

// New Route
router.get("/new",isLoginIn,(req,res)=>{
    res.render("listings/new.ejs");
});

// Show Route
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path:'reviews',
            populate: {
                path: "author",
            }
        })
        .populate('owner');

    if(!listing){
        req.flash("error","listing your requested for does not exist!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
}));

// Create Route
router.post("/",isLoginIn,validateListing,wrapAsync(async(req,res)=>{
    const newListing = new Listing(req.body.listing);
    console.log(req.user);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success","new listing created");
    res.redirect("/listings");
}));

// Edit Route
router.get("/:id/edit",isLoginIn,isOwner,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","listing your requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
}));

// Update Route
router.put("/:id",isLoginIn,isOwner,validateListing,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let listing =await Listing.findById(id);
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","listing updated");
    res.redirect("/listings");
}));

// Delete Route
router.delete("/:id",isLoginIn,isOwner,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success","listing deleted");
    res.redirect("/listings");
}));

module.exports = router;
