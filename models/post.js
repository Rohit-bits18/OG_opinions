const mongoose = require("mongoose");


const postSchema = mongoose.Schema({
 user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },userName:{
    type:String
  },
  date:{
    type:Date,
    default:Date.now
  },
  content:String,
  likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',

  }]
})


const post = mongoose.model('post',postSchema);

module.exports = post;