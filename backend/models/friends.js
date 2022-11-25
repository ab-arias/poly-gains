const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        required: true,
    },
    sender: {
        type: String,
        required: true,
        trim: true,
    },
    recipient: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        trim: true,
    },
});

module.exports = FriendSchema;
