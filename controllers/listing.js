const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const maptoken = process.env.MAP_ACCESS_TOKEN
const geocodingClient = mbxGeocoding({ accessToken: maptoken });

module.exports.index = async (req,res)=>{
    let alllisting = await Listing.find({});
    alllisting = alllisting.reverse();
    res.render("listings/index.ejs",{alllisting});
}

module.exports.newlist = (req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.createListing =async(req,res,next)=>{

    let response = await geocodingClient
    .forwardGeocode({
        query: req.body.listing.location,
        limit: 2
      })
        .send()

    ;
    

    // //let {title,description,price,location,country,image} = req.body; 
        let url = req.file.path;
        let filename = req.file.filename;
        const newList =  new Listing(req.body.listing);
        newList.owner = req.user._id;
        newList.image = {url,filename};

        newList.geometry = response.body.features[0].geometry;

        let savedlist = await newList.save();
        console.log(savedlist);
        req.flash("success","New Listing Created");
        res.redirect("/listings");
}

module.exports.show = async (req,res)=>{
    const {id} = req.params;
    const list = await Listing.findById(id).populate({path : "reviews",populate:{path:"author",},} ).populate("owner");
     if(!list){
        req.flash("error","Listing you requesed for does not exist !" );
        res.redirect("/listings");
     }
     console.log(list);
    res.render("listings/show.ejs",{list});
    
    
}
module.exports.editlisting = async (req,res)=>{
    const {id}= req.params;
    const list = await Listing.findById(id);
    if(!list){
        req.flash("error","Listing you requesed for does not exist !" );
        res.redirect("/listings");
     }

     let originalimgurl = list.image.url;
     originalimgurl = originalimgurl.replace("/upload","/upload/h_300,w_250")

    res.render("listings/edit.ejs",{list,originalimgurl});
}

module.exports.updatelisting = async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send Valid Data for Listing")
    }
    const {id} = req.params;
    const updatedList = req.body.listing;
    let listing = await Listing.findByIdAndUpdate(id,updatedList);
    
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    

    
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.deletelist = async (req,res)=>{
    const {id} = req.params;
    const del = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
}