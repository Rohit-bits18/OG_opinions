const express = require("express");
const { islogin } = require("../controllers/handleRegistration");
const user = require("../models/user");
const post = require("../models/post");
const router = express.Router();
const jwt = require('jsonwebtoken')

router.get("/",async (req,res)=>{
  try {
  const token = req.cookies.token;
   const  userpost = await post.find().sort({ date: -1 });
  if(!token){
  return res.render('home',{posts:userpost,user:req.user || null}); 
}else{
       const check = jwt.verify(token,'iruu');
       const temp = await user.findOne({_id:check.userid})

      return res.render('home',{posts:userpost,user:temp||null});
}
  } catch (error) {
    console.log("err happens in home page ")
  }

})







module.exports = router;