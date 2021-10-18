const User = require("../model/user")
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")


exports.usersignup = async(req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }

    const user = await new User(req.body)
    console.log(user)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "User Already Exist"
            })
        }

        return res.json({
            message: "Success",
            user
        })
    })
}

exports.usersignin = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User doesn't exist" });
        if (user.password !== password) {
            return res.status(400).json({
                error: "Email and password does not match"
            })
        }
        console.log(user)

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET);
        res.cookie('token', token, { expire: new Date() + 1 })

        res.status(200).json({ user: user, token });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
};

exports.usersignout = (req, res) => {
    res.clearCookie("token")
    return res.json({
        message: "user siginout successful"
    });
}