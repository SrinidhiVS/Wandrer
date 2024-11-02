const express = require('express');
const router = express.Router(); 
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/Listing.js');
const {isLoggedIn,isOwner,validateListing} = require('../middleware.js');
const listingController = require('../controllers/listings.js');
const multer  = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage });

router.get("/", wrapAsync(listingController.index));


router.route("/new")
.get(
   isLoggedIn,
   listingController.renderNewForm
)
.post(    
   isLoggedIn,
   
   upload.single('listing[image]'),
   validateListing,
   wrapAsync(listingController.createListing)
);



router.route("/:id")
.get(
   wrapAsync(listingController.showListing)
)
.put(
   isLoggedIn,
   isOwner,
   upload.single('listing[image.url]'),
   validateListing,
   wrapAsync(listingController.updateListing)
)
.delete(
   isLoggedIn,
   isOwner,
   wrapAsync(listingController.destroyListing)
);


router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;