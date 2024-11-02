const Listing=require("../models/Listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient=mbxGeocoding({accessToken:mapToken});


module.exports.index=async(req,res)=>{
   const alllistings = await Listing.find({});
   res.render("listings/index",{ alllistings });
};

module.exports.renderNewForm=(req,res)=>{
   res.render("listings/new");
};

module.exports.showListing=async(req,res)=>{
   let {id} = req.params;
   const listing = await Listing.findById(id).populate({
      path:'reviews',
      populate:{
         path:"author",
      },
   }).populate('owner');
   if(!listing){
      req.flash("error","Cannot find that listing");
      res.redirect('/listings');
   }
   // console.log(listing);
   res.render("listings/show",{ listing });
};

module.exports.createListing=async(req,res)=>{
   let response=await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
      .send();


   let url=req.file.path;
   let filename=req.file.filename;
   const newlisting = new Listing(req.body.listing);
   newlisting.owner=req.user._id;
   newlisting.image={url,filename};

    newlisting.geometry=response.body.features[0].geometry;

   let savedListing=await newlisting.save();
   console.log(savedListing);
   req.flash("success","New listing created!!");
   res.redirect("/listings");
};

module.exports.renderEditForm=async (req,res)=>{
   let {id} = req.params;
   const listing = await Listing.findById(id);
   if(!listing){
      req.flash("error","Cannot find that listing");
      res.redirect('/listings');
   }

   let originalImageUrl=listing.image.url;
   originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
   res.render('listings/edit',{ listing , originalImageUrl });
};

module.exports.updateListing=async(req,res)=>{
   let {id} = req.params;
   let listing=await Listing.findByIdAndUpdate(id, {...req.body.listing});
   if(typeof req.file !== 'undefined'){
      let url=req.file.path;
      let filename=req.file.filename;
      listing.image={url,filename};
      await listing.save();
   }
   req.flash("success","Listing updated!!");
   res.redirect('/listings');
};

module.exports.destroyListing=async(req,res)=>{  
   let {id} = req.params;
   await Listing.findByIdAndDelete(id);
   req.flash("success","Listing deleted!!");
   res.redirect('/listings');
};