const express = require("express");
// const { register } = require('../models/review');
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get(userController.signupform)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.loginform)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

//logout route
router.get("/logout", userController.logout);

module.exports = router;
