const {
  getGoals,
  createGoal,
  deleteGoal,
  updateGoal,
} = require("../controllers/goalsController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
const router = require("express").Router();

//goals controller
router
  .route("/")
  .get(isAuthenticated, getGoals)
  .post(isAuthenticated, createGoal);
router
  .route("/:id")
  .delete(isAuthenticated, deleteGoal)
  .put(isAuthenticated, updateGoal);

module.exports = router;
