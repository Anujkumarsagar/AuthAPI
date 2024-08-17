const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    role:{
        type: String,
        enum: ["User", "Admin", "Student"],
        default: "user"
    },
    token: {
        type: String,   
        default: null,
        expires: Date
    }
})

module.exports = mongoose.model("User", userModel);