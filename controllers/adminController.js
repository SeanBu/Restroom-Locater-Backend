const express = require('express');
const { User, Restroom, Submission } = require('../models/');
const { route } = require('./mainController');

const router = express.Router();

router.get("/reports", async (req, res) => {
    const reports = []
    const reportedSubmissions = await Submission.find({ reported: true }).populate('restroom').populate('user');
    reports.push(reportedSubmissions)
    return res.json(reports);
})

router.get("/numreports", async (req, res) => {
    const reportedSubmission = await Submission.find({ reported: true });
    return res.json(reportedSubmission.length)
})

router.get("/restrooms", async (req, res) => {
    const restrooms = await Restroom.find({});
    return res.json(restrooms.length);
})

router.get("/allrestrooms", async (req, res) => {
    allRestrooms = [];
    const restrooms = await Restroom.find({});
    allRestrooms.push(restrooms);
    return res.json(allRestrooms);
})


router.get("/users", async (req, res) => {
    const users = await User.find({});
    return res.json(users.length);
})

router.get("/allusers", async (req, res) => {
    sendUsers = [];
    const users = await User.find({});
    sendUsers.push(users);
    return res.json(sendUsers);
})

router.get("/submissions", async (req, res) => {
    const submissions = await Submission.find({});
    return res.json(submissions.length);
})

router.get('/allsubmissions', async (req, res) => {
    const allSubmissions = [];
    const submissions = await Submission.find({});
    allSubmissions.push(submissions);
    return res.json(allSubmissions);
})




router.put("/report", async (req, res) => {
    console.log(req.body)
    const reportedSubmission = await Submission.findOneAndUpdate({ restroom: req.body.restroom }, { reported: true });
    return res.json(reportedSubmission);
})

router.delete("/reports/delete", async (req, res) => {
    const deletedSubmission = await Submission.findByIdAndDelete(req.body.subId);
    const deletedRestoom = await Restroom.findByIdAndDelete(req.body.restId);

    return res.json({ message: `deleted submission: ${deletedSubmission._id} | deleted restroom: ${deletedRestoom._id}` });
})

module.exports = router;

