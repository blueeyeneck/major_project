const Listing = require("./models/listing");
const { listingSchema,reviewSchema } = require('./schema');
const ExpressError = require('./utlis/ExpressError.js');

// middleware for checking whether user is loged in or not
module.exports.isLoginIn=(req,res,next)=>{
    // console.log(req.path);
    // console.log(req.originalUrl);
    if(!req.isAuthenticated()){
        //redirect url save
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in for creating new listing");
        res.redirect("/login");
    }
    next();
}

// middleware for saving the session's redirectUrl to responds locals
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl =  req.session.redirectUrl;
    }
    next();
};


// middleware for checking whether the current user equals to the listing owner or not
module.exports.isOwner=async(req,res,next)=>{
    let {id} = req.params;
    let listing =await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }  
    next();
};

// Validations for schemes using middle wares
module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((e1)=>e1.message).join(',');
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}

// Validate Reviews
module.exports.validatereview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        console.log('in erroe');
        let errMsg=error.details.map((e1)=>e1.message).join(',');
        throw new ExpressError(420,errMsg);
    }
    else{
        next();
    }
}