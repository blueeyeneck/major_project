const express = require("express");
const router = express.Router();

const wrapAsync = require("../utlis/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users");


router.get("/signup",userController.signup);

router.post("/signup",wrapAsync(userController.renderSignup));

router.get("/login",userController.renderLoginForm);

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect : "/login",failureFlash:true}),userController.login);

router.get("/logout",userController.logout);

module.exports = router;
