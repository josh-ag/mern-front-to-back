const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    goal: { type: String, require: [true, "Please enter your goal"] },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Goals", goalSchema);
