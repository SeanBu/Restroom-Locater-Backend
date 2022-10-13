const express = require('express');
const { User, Restroom, Submission } = require('../models/')

const router = express.Router();

router.post("/newlocation", async (req, res) => {

    const submittedLocation = req.body;

    const newLocation = new Restroom({
        lat: submittedLocation.lat,
        lng: submittedLocation.lng,
        address: submittedLocation.address,
        cleanlinessRating: submittedLocation.cleanlinessRating,
        locationRating: submittedLocation.locationRating,
        description: submittedLocation.description,
        image: submittedLocation.image
    })

    newLocation.save();

    const newSubmission = new Submission({
        restroom: newLocation._id,
        user: submittedLocation.currentUserId
    })

    newSubmission.save();
    res.json({ message: "New Location added." })

})

module.exports = router;