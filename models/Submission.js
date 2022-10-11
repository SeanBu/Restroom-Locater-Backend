const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
    restroom: { type: mongoose.Types.ObjectId, ref: 'Restroom', required: [true, 'submission must include a restroom'] },
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: [true, 'submission must include a user'] },
    reported: { type: Boolean, default: false }
}, {
    timestamps: true
});

const Submission = mongoose.model("Submission", SubmissionSchema);

module.exports = Submission;