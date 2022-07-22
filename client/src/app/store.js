import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/auth/authSlice";
import GoalReducer from "../features/goals/goalSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    goals: GoalReducer,
  },
});
