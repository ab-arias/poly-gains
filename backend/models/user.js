const mongoose = require("mongoose");

const restId = mongoose.Types.ObjectId("637012e5c8e5bba98b4d3903");

const ActiveWorkoutsSchema = new mongoose.Schema({
    Monday: { type: mongoose.ObjectId, default: restId },
    Tuesday: { type: mongoose.ObjectId, default: restId },
    Wednesday: { type: mongoose.ObjectId, default: restId },
    Thursday: { type: mongoose.ObjectId, default: restId },
    Friday: { type: mongoose.ObjectId, default: restId },
    Saturday: { type: mongoose.ObjectId, default: restId },
    Sunday: { type: mongoose.ObjectId, default: restId },
});

const UserSchema = new mongoose.Schema({
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
        _id: false,
        type: ActiveWorkoutsSchema,
        default: () => ({}),
    },
    stats: {
        type: mongoose.ObjectId,
        required: true,
        trim: true,
    },
});

module.exports = UserSchema;
