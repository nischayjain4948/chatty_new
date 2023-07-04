const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");


const protect = asyncHandler(async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
            // decode the token 
            const decode = jwt.verify(token, process.env.JWT)
            // console.log("Decode", decode);
            req.user = await User.findById(decode.id).select("-password")
            next();
        }
        catch(error){
            res.status(401);
            throw new Error("Not authroized, token failed");

        }
        
    }

})

module.exports = {protect};