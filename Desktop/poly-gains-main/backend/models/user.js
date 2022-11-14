const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        avatar: {
            data: Buffer,
            contentType: String,
        },
        workouts: [
            {
                type: mongoose.ObjectId,
                ref: "Workout",
            },
        ],
        activeWorkouts: {
            type: Array,
            required: true,
            trim: true,
        },
    }
    //{ collection: "user" }
);

module.exports = UserSchema;
