const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: { type: String, require: [true, "Please enter firstname"] },
    lastname: { type: String, require: [true, "Please enter lastname"] },
    username: {
      type: String,
      require: [true, "Please enter username"],
      unique: true,
    },
    email: {
      unique: true,
      type: String,
      require: [true, "Please enter email"],
    },
    password: { type: String, require: [true, "Please enter password"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
