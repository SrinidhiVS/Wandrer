const express = require('express');
const router = express.Router({mergeParams:true}); 
const wrapAsync = require('../utils/wrapAsync.js');
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');
const {validateReview,isReviewAuthor,isLoggedIn} = require('../middleware.js');
const reviews = require('../controllers/reviews.js');

router.post("/",isLoggedIn,validateReview,wrapAsync(reviews.createReview));

router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviews.destroyReview));


module.exports = router;