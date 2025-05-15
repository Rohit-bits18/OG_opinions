const express = require("express");
const app = express();
const connection = require("./db/config")
const userRouter =require("./routes/userRoute");
const postRouter =require("./routes/postRoute");
const homeRouter =require("./routes/homeRouter");
require('dotenv').config();
const cookieparser = require('cookie-parser')


connection(process.env.url);
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser());
app.use('/user',userRouter)

app.use('/',homeRouter)
app.use('/post',postRouter)
app.get('/wrong',(req,res)=>{
  res.render("wrong");
})



module.exports = app;