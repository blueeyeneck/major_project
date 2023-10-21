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

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl =  req.session.redirectUrl;
    }
    next();
};