//IMPORTS
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization ||
      req.header.authorization.endsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    //verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id).select("-password");

    req.user = user;
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized! Bad request" });
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, token not found" });
  }

  //call next middleware
  next();
});

//EXPORT MODULE
module.exports = { isAuthenticated };
