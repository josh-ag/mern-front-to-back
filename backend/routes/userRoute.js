const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(isAuthenticated, getProfile);

module.exports = router;
