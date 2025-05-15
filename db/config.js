const mongoose = require('mongoose');

function connection(url){
    mongoose
    .connect(url)
    .then(()=>{console.log("db is connected to the server")})
    .catch((err)=>{
      console.log("the database error",err)
    })

    return;
}

module.exports = connection;