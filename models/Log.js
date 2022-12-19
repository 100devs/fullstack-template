const mongoose = require("mongoose");

// LOGS

const LogSchema = new mongoose.Schema({
  habits: [{
    habit: String,
    icon: String,
    unit: String,
    progress: Number,
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    // default: Date.now,
  },
});


//MongoDB Collection named here - will give lowercase plural of name 
module.exports = mongoose.model("Log", LogSchema);
