const mongoose = require("mongoose");


const userModel = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    pic: {
        type: String,
        required: true,
        default: "https://daluscapital.com/wp-content/uploads/2016/04/dummy-post-square-1-1.jpg"

    }

}, { timestamps: true });

const User = mongoose.model("User", userModel);
module.exports = User;