const Joi=require('joi');

module.exports.listingSchema=Joi.object({
   listing : Joi.object({
      title: Joi.string().required(),
      description : Joi.string().required(),
      price : Joi.number().required().min(0),
      location : Joi.string().required(),
      country : Joi.string().required(),
      // image : Joi.object({
      //    url:Joi.string().allow("",null).default("https://images.unsplash.com/photo-1577784424946-e12c7b211249?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
      // }),
}).unknown(true)
});

module.exports.reviewSchema=Joi.object({
   review : Joi.object({
      rating: Joi.number().required().min(1).max(5),
      comment: Joi.string().required(),
}).required()
});