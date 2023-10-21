const user = require("../models/user");

module.exports.signup = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.renderSignup = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        console.log(req.body);
        const newUser = new user({email,username});
        const reg = await user.register(newUser,password);
        console.log(reg);
        req.login(reg,(err)=>{
            if(err){
                console.log("in error");
                return next(err);
            }
            req.flash("success","welcome to waderlust");
            res.redirect("/listings");
        });
    } catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");  
    };
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login =async(req,res)=>{
    req.flash("success","welcome to woderlust your are login in");
    let redirectUrl = res.locals.redirectUrl;
    if(redirectUrl){
        res.redirect(res.locals.redirectUrl);
    }
    else{
        res.redirect("/listings");
    }
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged out!");
        res.redirect("/listings");
    });
};