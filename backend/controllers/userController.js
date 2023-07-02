const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const {generateToken} = require("../config/utils");


const registerUser =  asyncHandler(async (req,res) =>{
    const {name , email, password, pic} = req.body;
    if(!name || !email || !password ){
        res.status(400);
        throw new Error("Please Enter all the Feilds.")   
    }
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({name,email,password,pic});
    if(user){
        return res.status(201).json({_id:user._id, token:generateToken(user._id), email:user.email, name : user.name, pic: user.pic})
    }
    res.status(400);
    throw new Error("Failed to create the User");
})


const authUser =  asyncHandler (async(req,res)=>{
    const {email , password} = req.body;
    const user = await User.findOne({email});


    if(user && (await user.matchPassword(password))){
        return res.status(200).json({
            _id:user._id,
            name:user.user,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }
    res.status(401);
    throw new Error("Invalid Email & Password");

}) 


module.exports = {registerUser, authUser};