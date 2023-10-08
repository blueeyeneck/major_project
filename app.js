const express=require('express');
const app=express();
const mongoose=require('mongoose');
const port=8080;
const mongo_url="mongodb://127.0.0.1:27017/wanderlust";
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require('method-override');
const ejsMate=require('ejs-Mate');
const wrapAsync=require('./utlis/wrapAsync.js');


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


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

/* app.get("/testListing",async (req,res)=>{
    let sampleListing=new Listing({
        title:"My new Villa",
        description:"By the beach",
        price:12200,
        location:"bangalore,karnataka",
        country:"India"
    });
    await sampleListing.save();
    res.send("success");
    console.log("sample was saved");
}); */

app.get("/listings",async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

// new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

// show route
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});


//Create Route

app.post("/listings",wrapAsync(async(req,res,next)=>{                           //CUSTOM ERROR HANDLING USING WRAPASYNC MEHTOD
    // let {title,description,image,price,location,country}=req.body;
/*    console.log(title);
    console.log(price);
    console.log(description);
    console.log(country);*/
    // let listing=req.body.listing;
    // console.log(listing);
        const newListing=new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
}));

//edit route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//Update route with put request using method override package
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    console.log(req.body.listing);
    // console.log(...req.body.listing);
    const updated=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    console.log(updated);
    res.redirect("/listings");
});

//Delete route
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

// custom error handling

app.use((err,req,res,next)=>{
    res.send('something went wrong!');
})
