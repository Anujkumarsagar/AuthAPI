const jwt = require("jsonwebtoken")
require("dotenv").config();
// const User = require("../Model/User")
// const cookieParser = require('cookie-parser')
exports.auth = (req, res, next) => {

    try {
        // const token= req.body.token -> from the body (less secure way)
        //from the header   req.header{"Authorization"}.replace("Bearer", "") <---(most safest way to fetch the token)
        const token = req.header("Authorization")?.split(" ")[1];
        // console.log("this is the cookie",req.cookies)
        if (!token) {   
            return res.status(401).json({
                success: false,
                message: "No token founded"
            });
        }   
        //verfiy the token

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)

            req.user = decoded;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }

        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

exports.isStudent = (req, res, next) => {
    try {

        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "You are not a student"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server errorfrom student middleware"

        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    try {

        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "You are not a Admin"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server errorfrom Admin middleware"

        })
    }
    next();
}