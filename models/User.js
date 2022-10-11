const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: [true, 'Username already in use.'], required: [true, 'Username required.'] },
    email: { type: String, unique: [true, 'Email already associated with an account.'], required: [true, 'Email required.'] },
    password: { type: String, required: [true, 'Password required.'] },
    submissions: [{ type: mongoose.Types.ObjectId, ref: 'Submission' }]
}, {
    timestamps: true, toJSON: {
        transform: (_doc, ret) => {
            delete ret.password;
            return ret;
        }
    }, id: false
});

const User = mongoose.model("User", UserSchema);

module.exports = User;