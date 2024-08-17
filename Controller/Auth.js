const bcrypt = require("bcryptjs");
// const User = require("../Model/User")alreadyUser
const jwt = require("jsonwebtoken");
const User = require("../Model/User");
require("dotenv").config();
// gives
// input

/*

    {
        "name":"anuj kumar",
        "email":"anujkumarsagar62@gmail.com",
        "password":"anujkumar",
        "role":"visitor"
    }

*/

// <-----------------Result --------->
/*  {
        "name": "anuj kumar",
        "email": "anujkumarsagar62@gmail.com",
        "password": "$2a$10$LKXQfp8/zNEkrq0pnDH.ROTrJqC1.d9lNH3qYcEEsSMdtjjfLq/aa",
        "role": "visitor",
        "__v": 0
    } 
*/


exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        //check if user is alerady exists in the db

        const alreadyExits = await User.findOne({ email });

        if (alreadyExits) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }


        //hash password

        // var bcrypt = require('bcryptjs');
        // bcrypt.genSalt(10, function (err, salt) {
        //     bcrypt.hash("B4c0/\/", salt, function (err, hash) {
        //         // Store hash in your password DB.
        //     });
        // });

        let hashpassword

        try {

            hashpassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Hashing is not performed"
            })
        }

        // save the entery in the database

        const user = await User.create({
            name, email, password: hashpassword, role
        })

        return res.status(200).json({
            sucess: true,
            message: "Entry succefully created"
        })
    } catch (error) {


        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server error"
        })

    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

        

        // Find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        console.log(user);

        // Generate JWT token
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });

        // Store token in the user's document
        user.token = token;
        await user.save(); // Save the token in the database

        // Remove password from user object before sending response
        user.password = undefined;

        // Set cookie and send response
        // const options = {
        //     expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        //     httpOnly: true
        // };

        // return res.cookie("token", token, options).status(200).json({
        //     success: true,
        //     token: token,
        //     user: user,
        //     message: "Login successful"
        // });
        return res.json(
            {success:true,
            token: token,
            user: user,
            message: "Login successful"}
        )

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};




