const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema(
    {
        _id: {
            type: mongoose.ObjectId,
            required: true,
        },
        records: {
            type: Array,
            trim: true,
        },
        height: {
            type: Number,
            trim: true,
        },
        weight: {
            type: Number,
            trim: true,
        },
        mile: {
            type: String,
            trim: true,
        },
        calories: {
            type: Number,
            trim: true,
        },
        plan: {
            type: String,
            trim: true,
        },
    },
    { collection: "stats" }
);

module.exports = StatsSchema;
