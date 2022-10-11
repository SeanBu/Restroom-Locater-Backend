require("dotenv").config();

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/')


const router = express.Router();

function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"]?.split(' ')[1]

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.json({
                isLoggedIn: false,
                message: 'Authentication failed.'
            })
            req.user = {};
            req.user.id = decoded.id
            req.user.username = decoded.username
            next()
        })
    } else {
        res.json({ message: 'Incorrect token.', isLoggedIn: false })
    }
}

router.post('/register', async (req, res) => {
    const user = req.body;
    console.log(req.body);
    const submittedUserName = await User.findOne({ username: user.username });
    const submittedEmail = await User.findOne({ email: user.email });

    if (submittedEmail || submittedUserName) {
        res.json({ message: "Username or Email already in use." })
    } else {
        console.log(user);
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

router.get('/username', verifyJWT, (req, res) => {
    res.json({ isLoggedIn: true, username: req.user.username })
});

module.exports = router;