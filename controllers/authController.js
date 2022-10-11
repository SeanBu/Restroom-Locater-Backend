require("dotenv").config();

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/')


const router = express.Router();

router.post('/register', async (req, res) => {
    const user = req.body;

    const submittedUserName = await User.findOne({ username: user.username });
    const submittedEmail = await User.findOne({ email: user.email });

    if (submittedEmail || submittedUserName) {
        res.json({ message: "Username or Email already in use." })
    } else {
        user.password = await bcrypt.hash(req.body.password, process.env.ROUNDS)
    }
});

router.post('/login', async (req, res) => {

});