//IMPORTS
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const User = require("../models/userModel");

//@desc - REGISTER USER
//@method - POST
//@access - PUBLIC
const registerUser = asyncHandler(async (req, res, next) => {
  const { firstname, lastname, email, username, password } = req.body;

  console.log(req.body);

  if (!firstname || !lastname || !email || !username || !password) {
    return res.status(400).json({ message: "Some fields are missing" });
  }

  //isUsername exist
  const usernameExist = await User.findOne({ username });
  if (usernameExist) {
    return res.status(400).json({ message: "This username is already taken" });
  }

  //isEmail used
  const isEmailUsed = await User.findOne({ email });
  if (isEmailUsed) {
    return res.status(400).json({ message: "This email is already used" });
  }

  //hash password
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  //create new User
  const user = await User.create({
    firstname,
    lastname,
    email,
    username,
    password: hash,
  });

  //send back resp
  res.status(201).json({
    message: "registration successful",
    user: user.id,
  });
});

//@desc - LOGIN USER
//@method - POST
//@access - PUBLIC
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Some fields are missing" });
  }

  //find user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Cannot find user" });
  }

  //if user, compare password
  const isPasswordMatch = compareSync(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const token = genToken(user._id);
  //send back resp
  res.status(200).json({
    message: "Login successful",
    user: { email: user.email, username: user.username, id: user.id },
    token,
  });
});

//@desc - GET USER PROFILE
//@method - GET
//@access - PRIVATE
const getProfile = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .json({ message: "your now accessing user profile", user: req.user });
});

//@desc - UPDATE USER PROFILE
//@method - PUT
//@access - PRIVATE
const updateProfile = asyncHandler(async (req, res, next) => {
  const update = await User.findOneAndUpdate({ _id: req.user.id }, req.body, {
    updated: true,
  }).select("-password");

  res.status(201).json({ message: "Changes was applied!", updated: update });
});

//gen token
const genToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
};

//EXPORT MODULES
module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
};
