const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utlis/wrapAsync");
const passport = require("passport");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        console.log(req.body);
        const newUser = new User({email,username});
        const reg=await User.register(newUser,password);
        console.log(reg);
        req.flash("success","user was registered successfull");
        res.redirect("/listings");
    } catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");  
    };
}));

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

router.post("/login",
passport.authenticate("local",{
    failureRedirect : "/login",
failureFlash:true}),
async(req,res)=>{
    req.flash("success","welcome to woderlust your are login in");
    res.redirect("/listings");
});

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged out!");
        res.redirect("/listings");
    });
});

module.exports = router;
