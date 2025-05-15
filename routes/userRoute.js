const express = require('express');
const { register ,login, islogin} = require('../controllers/handleRegistration');
const router = express.Router();
const users = require("../models/user");

const user = require('../models/user');
const post = require('../models/post');

router.get("/register",(req,res)=>{
  res.render("signin")
})

router.get("/login",(req,res)=>{
  res.render("login")
})

router.get('/',async(req,res)=>{
  const temp = await users.find();
  res.send(temp);
})


router.get('/profile',islogin,async(req,res)=>{
 try {
   const checkuser = await user.findOne({_id:req.user.userid});
   if(!checkuser){return res.redirect('/user/login')}
  
  userpost = [];
  if(checkuser.posts.length > 0){
  userpost = await post.find({user:checkuser._id});
     
  }
   
  return res.render('profile',{user:checkuser,posts:userpost});
      

 } catch (error) {
  console.log("there is an error in proflie route")
 }
})

router.post('/register',register)
router.post('/login',login)




module.exports = router;