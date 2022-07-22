const {
  getGoals,
  createGoal,
  deleteGoal,
  updateGoal,
  getGoal,
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
  .get(isAuthenticated, getGoal)
  .delete(isAuthenticated, deleteGoal)
  .put(isAuthenticated, updateGoal);

module.exports = router;
