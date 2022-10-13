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

router.get("/getmarkers", async (req, res) => {
    const Restrooms = await Restroom.find({});
    const markers = [];
    for (let i = 0; i < Restrooms.length; i++) {
        const marker = { lat: 0, lng: 0 };
        marker.lat = Restrooms[i].lat;
        marker.lng = Restrooms[i].lng;
        markers.push(marker);
    }
    res.json(markers);
})

module.exports = router;