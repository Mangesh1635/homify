const User = require("../models/user.js");

module.exports.signupform = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newuser = new User({ email, username });
    const registerdUser = await User.register(newuser, password);
    console.log(registerdUser);
    req.logIn(registerdUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcom to Homify !!!");
      res.redirect("/listings");
    });

    // req.flash("success","User Successfully Signed Up !!!");
    // res.redirect("/login");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.loginform = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = (req, res) => {
  req.flash("success", "Welcom to Homify !!!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out !!");
    res.redirect("/listings");
  });
};
