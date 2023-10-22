const express = require('express');
const router = express.Router();
const wrapAsync = require('../utlis/wrapAsync.js');
// const { listingSchema } = require('../schema.js');
// const ExpressError = require('../utlis/ExpressError.js');
// const Listing = require("../models/listing.js");
// const user = require("../models/user.js");
const {isLoginIn,isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");

// Index Route and Create Route
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoginIn,validateListing,wrapAsync(listingController.createList));


// New Route
router.get("/new",isLoginIn,listingController.rederNewForm);

// Edit Route
router.get("/:id/edit",isLoginIn,isOwner,wrapAsync(listingController.editListing));

// Update Route and Delete Route and Show Route
router.route("/:id")
    .put(isLoginIn,isOwner,validateListing,wrapAsync(listingController.updateListing))
    .delete(isLoginIn,isOwner,wrapAsync(listingController.destroyListing))
    .get(wrapAsync(listingController.showListing));

module.exports = router;
