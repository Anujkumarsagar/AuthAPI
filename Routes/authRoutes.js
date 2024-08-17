const express = require('express');
// const Signup = require("../Controller/signupController");
const { signup, login } = require('../Controller/Auth');
const {auth, isStudent, isAdmin} = require("../middleware/auth")
const router = express.Router();

// Map routes to controllers
// router.post("/signup", Signup); 
// Use Signup for POST /signup
// router.get("/login", Login);   
router.post("/signup", signup);
// Use Login for GET /login
router.post("/login", login);
// Export the router


// middlware authentication and autherization

router.get

router.get("/student", auth, isStudent, (req,res) =>{
    return res.json({
        sucess: true,
        message: "You are a student"
    })
})
router.get("/admin", auth, isAdmin, (req,res) =>{
    return res.json({
        sucess: true,
        message: "You are a Admin"
    })
})
module.exports = router;
