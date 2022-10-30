const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema({
  records: {
    type: Array,
    required: true,
    trim: true,
  },
  height: {
    type: Number,
    required: true,
    trim: true,
  },
  weight: {
    type: Number,
    required: true,
    trim: true,
  },
  mile: {
    type: String,
    required: true,
    trim: true,
  },
  calories: {
    type: Number,
    required: true,
    trim: true,
  },
  plan: {
    type: String,
    required: true,
    trim: true,
  },
}, {collection : 'stats'});

module.exports = StatsSchema;