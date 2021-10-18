const express = require("express")
const {
    usersignup,
    usersignin,
    usersignout
} = require("../controller/user.js")
const { check } = require('express-validator')
const router = express.Router()

router.post('/usersignup', [
    check("email", "Email should be valid").isEmail(),
    check("password", "Password at least should be 6 characters").isLength({ min: 6 }),
], usersignup)

router.post('/usersignin', usersignin)
router.get("/usersignout", usersignout)

module.exports = router