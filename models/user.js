const mongoose=require('mongoose');
const { use } = require('passport');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
      username:{
         type:String,
         required:true,
         unique:true,
      },
      email:{
         type:String,
         required:true,
         unique:true,
      },
      password:{
         type:String,
      }
   });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);