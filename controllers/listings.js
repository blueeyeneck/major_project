const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
console.log(mapToken);
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.rederNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req,res)=>{
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
};

module.exports.createList = async(req,res)=>{
    
    let response = await geocodingClient
        .forwardGeocode({
        query: req.body.listing.location,
        limit: 1
        })
        .send();

    console.log("done");
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url,"--",filename);
    const newListing = new Listing(req.body.listing);
    console.log(req.user);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    newListing.geometry = response.body.features[0].geometry;
    let saved = await newListing.save();
    console.log("saved",saved);
    req.flash("success","new listing created");
    res.redirect("/listings");
};

module.exports.editListing = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","listing your requested for does not exist!");
        res.render("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250,h_300,e_blur:50");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.updateListing = async(req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !="undefined"){
        console.log("here");
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename}
        await listing.save();
    }
    req.flash("success","listing updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    let deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success","listing deleted");
    res.redirect("/listings");
};