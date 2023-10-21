const express = require('express');
const router = express.Router();
const wrapAsync = require('../utlis/wrapAsync.js');
// const { listingSchema } = require('../schema.js');
// const ExpressError = require('../utlis/ExpressError.js');
// const Listing = require("../models/listing.js");
// const user = require("../models/user.js");
const {isLoginIn,isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

// Index Route
router.get("/",wrapAsync(listingController.index));

// New Route
router.get("/new",isLoginIn,listingController.rederNewForm);

// Show Route
router.get("/:id",wrapAsync(listingController.showListing));

// Create Route
router.post("/",isLoginIn,validateListing,wrapAsync(listingController.createList));

// Edit Route
router.get("/:id/edit",isLoginIn,isOwner,wrapAsync(listingController.editListing));

// Update Route
router.put("/:id",isLoginIn,isOwner,validateListing,wrapAsync(listingController.updateListing));

// Delete Route
router.delete("/:id",isLoginIn,isOwner,wrapAsync(listingController.destroyListing));

module.exports = router;
