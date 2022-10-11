const mongoose = require("mongoose");

const RestroomSchema = new mongoose.Schema({
    lat: { type: Number, required: [true, 'Lat required.'] },
    lng: { type: Number, required: [true, 'Lng required.'] },
    address: { type: String },
    cleanlinessRating: { type: Number, required: [true, 'Please rate the cleanliness of the restroom'] },
    locationRating: { type: Number, required: [true, 'Please rate the location of the restroom'] },
    description: { type: String, required: [true, 'Please add a description of the restroom'] },
    image: { type: String }
}, {
    timestamps: true
});

const Restroom = mongoose.model("Restroom", RestroomSchema);

module.exports = Restroom;