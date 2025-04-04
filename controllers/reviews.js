const Review = require("../models/review.js"); 
const Listing = require("../models/listing");

module.exports.addReview = async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("new Review Saved !!");
    req.flash("success","New Review Created");
    res.redirect(`/listings/${id}`);
}

module.exports.deletereview =async (req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/listings/${id}`);
}