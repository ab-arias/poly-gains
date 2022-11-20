const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
    exercise: {
        type: String,
        required: true,
        trim: true,
    },
    sets: {
        type: String,
        required: true,
        trim: true,
    },
    reps: {
        type: String,
        required: true,
        trim: true,
    },
});

const WorkoutSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        exercise_list: [
            {
                type: ExerciseSchema,
                required: true,
            },
        ],
    },
    { collection: "workouts" }
);

module.exports = WorkoutSchema;
