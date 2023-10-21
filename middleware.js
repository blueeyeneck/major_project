module.exports.isLoginIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash("error","you must be logged in for creating new listing");
        res.redirect("/login");
    }
    next();
}