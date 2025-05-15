const mongoose = require("mongoose");
const user = require('../models/user')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


async function register(req,res){
     try {

       const {name,age,email,password} = req.body;
   
       if(!name && !age && !email && !password){return res.redirect('/wrong');}

       const check = await user.findOne({email:email});

       if(check){return res.send("user is already registerd");}
       
      bcrypt.genSalt(8, function(err1, salt) {
    bcrypt.hash(password, salt, async(err2, hash)=> {
         if(err2){return res.redirect("/wrong")}
        const nUser = await user.create({
           name,age,email,password:hash
       });
 
       const token = jwt.sign({email:email,userid:nUser._id},"iruu");
       res.cookie("token",token);
      return res.redirect('/'); 
    });
});

       
     } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong");
      
     }
}



async function login(req,res){
    const {email,password} = req.body;
   
       if( !email && !password){return res.redirect('/wrong');}

       const existingUser = await user.findOne({email:email});
       if(!existingUser){
        return res.send("user is not found")
        res.redirect("/user/register")
      }

       bcrypt.compare(password,existingUser.password,(err,result)=>{
        if(result){
            const token = jwt.sign({email:email,userid:existingUser._id},"iruu");
                  res.cookie("token",token);
        return res.redirect('/'); 
        }
        return res.send("password is incorrect");
       
       })

}


function islogin(req,res,next){
 try {
  if(!req.cookies.token){return res.redirect('/user/login');}
  const data = jwt.verify(req.cookies.token,'iruu');
  
   req.user = data
     next();
 } catch (error) {
  console.log(req.cookies)
  console.log("ther is an error in islogin middle ware");
 }
}
 
module.exports = {register,login,islogin}