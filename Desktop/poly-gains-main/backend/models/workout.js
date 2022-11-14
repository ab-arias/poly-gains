const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        days: {
            type: Array,
            required: true,
            trim: true,
        },
        exercise_list: {
            type: Array,
            required: true,
            trim: true,
        },
    },
    { collection: "workouts" }
);

module.exports = WorkoutSchema;
