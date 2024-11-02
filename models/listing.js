const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Review=require('./review');

const listingSchema=new mongoose.Schema({
      title:{
         type: String,
         required: true,
      },
      description:String,
      image:{
         filename: String,
         url:{
            type: String,
            // filename: String,
            default: "https://images.unsplash.com/photo-1577784424946-e12c7b211249?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set:(v) => v === "" ? "https://images.unsplash.com/photo-1577784424946-e12c7b211249?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
            // required: true,
         },
      },
      price:Number,
      location:String,
      country:String,
      reviews:[
         {
           type:Schema.Types.ObjectId,
           ref:'Review', 
         },
      ],
      owner:{
         type:Schema.Types.ObjectId,
         ref:'User',
      },
      geometry:{
         type:{
            type:String,
            enum:['Point'],
            required:true,
         },
         coordinates:{
            type:[Number],
            required:true,
         },
      },
      // category:{
      //    type: String,
      //    enum:["Rooms","Iconic cities","Mountain","Royal Stays","River Side","Camping","Country Side","Snowfall"],
      // },implement this backend
   });

listingSchema.post("findOneAndDelete", async(listing) => {
   if(listing.reviews.length){
      await Review.deleteMany({_id:{$in:listing.reviews}});
   }
   });
   
   
// const Listing=mongoose.model('Listing',listingSchema);
module.exports=mongoose.models.Listing||mongoose.model('Listing',listingSchema);