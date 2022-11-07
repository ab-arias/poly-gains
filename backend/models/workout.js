const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema(
<<<<<<< HEAD
  {
    name: {
      type: String,
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
=======
    {
        name: {
            type: String,
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
>>>>>>> main
);

module.exports = WorkoutSchema;
