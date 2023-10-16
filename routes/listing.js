const express = require('express');
const router = express.Router();
const wrapAsync = require('../utlis/wrapAsync.js');
const { listingSchema } = require('../schema.js');
const ExpressError = require('../utlis/ExpressError.js');
const Listing = require("../models/listing.js");

// Validations for schemes using middle wares
const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((e1)=>e1.message).join(',');
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}

// Index Route
router.get("/",wrapAsync(async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

// New Route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
});

// Show Route
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate('reviews');
    if(!listing){
        req.flash("error","listing your requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}));

// Create Route
router.post("/",validateListing,wrapAsync(async(req,res)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success","new listing created");
    res.redirect("/listings");
}));

// Edit Route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","listing your requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
}));

// Update Route
router.put("/:id",validateListing,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","listing updated");
    res.redirect("/listings");
}));

// Delete Route
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success","listing deleted");
    res.redirect("/listings");
}));

module.exports = router;
