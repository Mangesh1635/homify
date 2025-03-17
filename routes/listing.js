const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin, isowner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listing.js");

const multer = require("multer");
const { storage } = require("../cloudconfig");
const upload = multer({ storage: storage }); // Explicitly set storage

router
  .route("/")
  .get(wrapAsync(listingController.index)) //index route
  .post(
    isLoggedin,
    
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  ); //create new list item route

//new list route
router.get("/new", isLoggedin, listingController.newlist);

router
  .route("/:id")
  .get(wrapAsync(listingController.show)) //show route
  .put(
    isLoggedin,
    isowner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updatelisting)
  ) //Update route
  .delete(isLoggedin, isowner, wrapAsync(listingController.deletelist)); // delete route

// edit route
router.get(
  "/:id/edit",
  isLoggedin,
  isowner,
  wrapAsync(listingController.editlisting)
);

module.exports = router;
