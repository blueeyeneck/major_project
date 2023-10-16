const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 8080;
const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require('ejs-Mate');
const ExpressError = require('./utlis/ExpressError.js');
const session = require("express-session");
const flash = require("connect-flash");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const sessionOptions = {
    secret : "mysupersecreatcode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    // console.log(res.locals.success);
    next();
})

const listings = require("./routes/listing.js");
const reviews = require("./routes/reviews.js");


app.listen(port,()=>{
    console.log(`sever is listening to port no:-${port}`);
});

app.get('/',(req,res)=>{
    res.render("listings/home.ejs");
});

async function main(){
    await mongoose.connect(mongo_url);
}

main()
    .then(()=>{
        console.log("connected to DB");
    })
    .catch((err)=>{
        console.log(`error occured:-${err}`);
    });


app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);


// Custom Error Handling
app.all('*',(req,res,next)=>{
    next(new ExpressError(420,'page not found'));
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message='somethis went wrong'}=err;
    res.status(statusCode).render('error.ejs',{err});
    // res.status(statusCode).send(message);
    // res.send('something went wrong!');
})



/*
const { listingSchema, reviewSchema} = require('./schema.js');
const review = require("./models/reviews.js");
const { wrap } = require('module');
const wrapAsync = require('./utlis/wrapAsync.js');
const Listing = require("./models/listing.js");



// Index Route
app.get("/listings",wrapAsync(async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

// new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

// show route
app.get("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate('reviews');
    res.render("listings/show.ejs",{listing});
}));


//Create Route

app.post(
    "/listings",
    validateListing,                                      // validating using middlewares
    wrapAsync(async(req,res,next)=>{                           //CUSTOM ERROR HANDLING USING WRAPASYNC MEHTOD
    // let {title,description,image,price,location,country}=req.body;
//    console.log(title);
//     console.log(price);
//     console.log(description);
//     console.log(country);
    // let listing=req.body.listing;
    // console.log(listing);


        // if(!req.body.listing){
        //     throw new ExpressError(400,'bad request and send valid data for listing');
        // }
        // const newListing=new Listing(req.body.listing);
        // if(!newListing.description){
        //     throw new ExpressError(400,'description is missing');
        // }
        // if(!newListing.location){
        //     throw new ExpressError(400,'locatoin is missing');
        // }
        // if(!newListing.title){
        //     throw new ExpressError(400,'title is missing');
        // }

        // below is schema validation using joi for npm normally
        // let result=listingSchema.validate(req.body);
        // console.log(result);
        // if(result.error){
            // throw new ExpressError(400,result.error);
        // }
        const newListing=new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
}));

//edit route
app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//Update route with put request using method override package
app.put(
    "/listings/:id",
    validateListing,                                            // validating using middlewares
    wrapAsync(async(req,res)=>{
    // if(!req.body.listing){
    //     throw new ExpressError(400,'bad request and send valid data for listing');
    // }

    let {id}=req.params;
    console.log(req.body.listing);
    // console.log(...req.body.listing);
    const updated=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    console.log(updated);
    res.redirect("/listings");
}));

//Delete route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deleted=await Listing.findByIdAndDelete(id);
    console.log(deleted);
    await review.deleteMany({_id:{$in:deleted.reviews}});

    res.redirect("/listings");
}));    

// review 
// posting review route
app.post('/listings/:id/reviews',validatereview,wrapAsync(async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log('new review saved');
    res.redirect(`/listings/${req.params.id}`);

    // let newreview = new review(req.body.review);
    // console.log(req.body);
    // console.log(req.params);
    // let {id}=req.params;
    // let list=await Listing.findById(id);
    // await newreview.save();
    // console.log('id:-',id.title);
    // await list.reviews.push(newreview);
    // console.log('done');
    // console.log(newreview);
    // await list.save();
    // res.redirect(`/listings/${id}`);
}));

// delete review route
app.delete('/listings/:id/reviews/:reviewId',wrapAsync(async(req,res)=>{
    let {id,reviewId}=req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}));

*/

/*
// validations for schema using middle wares
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

// validate reviews
const validatereview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    console.log("in review validation");
    if(error){
        let errMsg=error.details.map((e1)=>e1.message).join(',');
        throw new ExpressError(420,errMsg);
    }
    else{
        next();
    }
}

*/