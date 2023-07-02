const mongoose = require("mongoose");
const ConnectDB =  async () =>{
 try{
  await mongoose.connect("mongodb://127.0.0.1:27017/chatty"); 
  console.log("MongoDB connected successfully");
 }
 catch(error){
    console.log("Error", error);
 }   
}

module.exports = {ConnectDB};