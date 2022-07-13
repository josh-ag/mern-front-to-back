const {
  getGoals,
  createGoal,
  deleteGoal,
  updateGoal,
} = require("../controllers/goalsController");

const router = require("express").Router();

//goals controller
router.route("/").get(getGoals).post(createGoal);
router.route("/:id").delete(deleteGoal).put(updateGoal);

module.exports = router;
