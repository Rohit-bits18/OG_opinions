const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  name:String,
  age:Number,
  email:String,
  password:String,
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'post'
  }]
})

const user = mongoose.model('user',userSchema)

module.exports = user 