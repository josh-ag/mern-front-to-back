const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    goal: { type: String, require: [true, "Please enter your goal"] },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Goals", goalSchema);
