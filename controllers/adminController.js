const express = require('express');
const { User, Restroom, Submission } = require('../models/')

const router = express.Router();

router.get("/reports", async (req, res) => {
    const reports = []
    const reportedSubmissions = await Submission.find({ reported: true }).populate('restroom').populate('user');
    for (let i = 0; i < reportedSubmissions.length; i++) {
        reports.push(reportedSubmissions)
    }
    return res.json(reports);
})

router.get("/submissions", async (req, res) => {

})

router.get("/restrooms", async (req, res) => {

})

router.get("/users", async (req, res) => {

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

