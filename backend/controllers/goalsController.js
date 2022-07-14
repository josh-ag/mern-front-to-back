const AsyncHandler = require("express-async-handler");
const Goals = require("../models/goalsModel");
//@desc - get all goals
//@route - GET
//@access - private
const getGoals = AsyncHandler(async (req, res, next) => {
  const goals = await Goals.find();
  res.status(200).json({ message: "successful", goals });
});

//@desc - create goals
//@method - POST
//@access - private
const createGoal = AsyncHandler(async (req, res, next) => {
  //get goal from req.body
  const { goal } = req.body;

  //check if goal exist
  if (!goal) {
    return res.status(400).json({
      message: "goal field is required",
      stack: process.env.NODE_ENV === "production" ? null : res.stack,
    });
  }

  //create new goal
  let resp = await Goals.create({ user: req.user.id, goal });

  res.status(201).json({ message: "New goal created", goal: resp });
});

//@desc - update goals
//@method - UPDATE
//@access - private
const updateGoal = AsyncHandler(async (req, res, next) => {
  const goal = await Goals.findById(req.params.id);

  if (!goal) {
    return res.status(400).json({ message: "Goal not found" });
  }

  //update goal
  const updatedGoal = await Goals.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      updated: true,
    }
  );

  res.status(201).json({ message: "Goal updated", id: req.params.id });
});

//@desc - delete goals
//@method - DELETE
//@access - private
const deleteGoal = AsyncHandler(async (req, res, next) => {
  const goal = await Goals.findById(req.params.id);

  if (!goal) {
    return res.status(400).json({ message: "goal not found" });
  }

  await goal.remove();

  res.status(200).json({ message: "Delete goal", id: req.params.id });
});

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
