require("dotenv").config();

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/')
const verifyJWT = require("../middleware/verify");

const router = express.Router();

router.post('/register', async (req, res) => {
    const user = req.body;
    const submittedUserName = await User.findOne({ username: user.username });
    const submittedEmail = await User.findOne({ email: user.email });

    if (submittedEmail || submittedUserName) {
        res.json({ message: "Username or Email already in use." })
    } else {
        user.password = await bcrypt.hash(req.body.password, 12)

        const newUser = new User({
            username: user.username,
            email: user.email,
            password: user.password
        })

        newUser.save();
        res.json({ message: 'user successfully registered' });
    }
});

router.post('/login', async (req, res) => {
    const submittedUserInfo = req.body;

    const foundUser = await User.findOne({ username: submittedUserInfo.username });
    if (!foundUser) {
        return res.json({ message: 'Invalid username or password.' });
    }
    const correctPass = await bcrypt.compare(submittedUserInfo.password, foundUser.password)
    if (correctPass) {
        const payload = {
            id: foundUser._id,
            username: foundUser.username,
        }
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 86400 },
            (err, token) => {
                if (err) return res.json({ message: err });
                return res.json({
                    message: 'Login Successful',
                    token: 'Bearer ' + token
                });
            }
        )
    } else {
        return res.json({ message: 'Invalid username or password.' });
    }
});

router.get("/isUserAuth", verifyJWT, (req, res) => {
    return res.json({ isLoggedIn: true, username: req.user.username })
})

module.exports = router;