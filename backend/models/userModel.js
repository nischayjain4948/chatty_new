const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userModel = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    pic: {
        type: String,
        default: "https://daluscapital.com/wp-content/uploads/2016/04/dummy-post-square-1-1.jpg"

    }

}, { timestamps: true });


// This function is run for every object before the function called..
userModel.pre("save", async function(next){
    if(!this.isModified){
        next();
    }
    const salt =  await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); 
})


// User Methods 
userModel.methods.matchPassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword, this.password);
}

const User = mongoose.model("User", userModel);
module.exports = User;