const mongoose = require("mongoose");


const HabitSchema = new mongoose.Schema({
  habit: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    require: true,
  },
  unit: {
    type: String,
    require: true,
  },
  increment: {
    type: Number,
    required: true,
  },
  progress: {
    type: Number,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//MongoDB Collection named here - will give lowercase plural of name 
module.exports = mongoose.model("Habit", HabitSchema);
