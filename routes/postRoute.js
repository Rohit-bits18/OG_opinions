const express = require("express");
const { islogin } = require("../controllers/handleRegistration");
const user = require("../models/user");
const post = require("../models/post");
const router = express.Router();

router.post("/create",islogin,async (req,res)=>{
 try {
   const body = req.body;
   if(!body){return res.redirect("/wrong");}
        const check = await user.findOne({_id:req.user.userid});
        
        const data = await post.create({
             user:check._id,
             userName:check.name,
             content:body.content,
        })
 
        check.posts.push((data._id));
        await check.save();
        
        res.redirect("/user/profile")

 } catch (error) {
  console.log("there is an in content postinhg")
 }

})




router.post('/like/:id',islogin,async(req,res)=>{
    try {
      const blog = await post.findOne({ _id: req.params.id });
     if (!blog) return res.send("Something went wrong");
 
     // Check if user already liked
     const hasLiked = blog.likes.includes(req.user.userid);
 
     if (hasLiked) {
       // Unlike if already liked
       blog.likes = blog.likes.filter(id => id !== req.user.userid);
     } else {
       // Like the post
       
       blog.likes.push(req.user.userid);
     }
 
     await blog.save();
     return res.redirect('/');
    } catch (error) {
     console.log('ther is an error in like route')
    }
})


module.exports = router;