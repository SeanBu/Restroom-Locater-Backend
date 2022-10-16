const express = require('express');
const { User, Restroom, Submission } = require('../models/');
const { route } = require('./mainController');

const router = express.Router();

router.get("/reports", async (req, res) => {
    try {
        const reports = []
        const reportedSubmissions = await Submission.find({ reported: true }).populate('restroom').populate('user');
        reports.push(reportedSubmissions)
        return res.json(reports);
    } catch (err) {
        return res.json(err);
    }
})

router.get("/numreports", async (req, res) => {
    try {
        const reportedSubmission = await Submission.find({ reported: true });
        return res.json(reportedSubmission.length)
    } catch (err) {
        return res.json(err);
    }
})

router.get("/restrooms", async (req, res) => {
    try {
        const restrooms = await Restroom.find({});
        return res.json(restrooms.length);
    } catch (err) {
        return res.json(err);
    }
})

router.get("/allrestrooms", async (req, res) => {
    try {
        allRestrooms = [];
        const restrooms = await Restroom.find({});
        allRestrooms.push(restrooms);
        return res.json(allRestrooms);
    } catch (err) {
        return res.json(err);
    }
})


router.get("/users", async (req, res) => {
    try {
        const users = await User.find({});
        return res.json(users.length);
    } catch (err) {
        return res.json(err);
    }
})

router.get("/allusers", async (req, res) => {
    try {
        sendUsers = [];
        const users = await User.find({});
        sendUsers.push(users);
        return res.json(sendUsers);
    } catch (err) {
        return res.json(err);
    }
})

router.get("/submissions", async (req, res) => {
    try {
        const submissions = await Submission.find({});
        return res.json(submissions.length);
    } catch (err) {
        return res.json(err);
    }
})

router.get('/allsubmissions', async (req, res) => {
    try {
        const allSubmissions = [];
        const submissions = await Submission.find({});
        allSubmissions.push(submissions);
        return res.json(allSubmissions);
    } catch (err) {
        return res.json(err);
    }
})

router.put("/report", async (req, res) => {
    try {
        const reportedSubmission = await Submission.findOneAndUpdate({ restroom: req.body.restroom }, { reported: true });
        return res.json(reportedSubmission);
    } catch (err) {
        return res.json(err);
    }
})

router.delete("/reports/delete", async (req, res) => {
    try {
        const deletedSubmission = await Submission.findByIdAndDelete(req.body.subId);
        const deletedRestoom = await Restroom.findByIdAndDelete(req.body.restId);

        return res.json({ message: `deleted submission: ${deletedSubmission._id} | deleted restroom: ${deletedRestoom._id}` });
    } catch (err) {
        return res.json(err);
    }
})

module.exports = router;

