const Listing = require("../models/listing");

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
    console.log("done");
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url,"--",filename);
    const newListing = new Listing(req.body.listing);
    console.log(req.user);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success","new listing created");
    res.redirect("/listings");
};

module.exports.editListing = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","listing your requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
};

module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let listing =await Listing.findById(id);
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","listing updated");
    res.redirect("/listings");
};

module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    let deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success","listing deleted");
    res.redirect("/listings");
};