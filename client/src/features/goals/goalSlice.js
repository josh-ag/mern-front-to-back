import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// import { logout } from "../auth/authSlice";
import goalServices from "../services/goalServices";

const initialState = {
  isError: false,
  isSuccess: false,
  message: "",
  isLoading: false,
  goals: [],
  goal: null,
};

//GET ALL GOALS
export const getGoals = createAsyncThunk("/goals/get", async (_, thunkAPI) => {
  try {
    const response = await goalServices.getGoals();
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//GET SINGLE GOAL
export const getGoal = createAsyncThunk("/goal/get", async (id, thunkAPI) => {
  try {
    const response = await goalServices.getGoal(id);
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//CREATE GOAL
export const createGoal = createAsyncThunk(
  "/goal/create",
  async (goal, thunkAPI) => {
    try {
      const response = await goalServices.createGoal(goal);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//UPDATE GOAL
export const updateGoal = createAsyncThunk(
  "/goal/update",
  async (updatedGoal, thunkAPI) => {
    try {
      const response = await goalServices.updateGoal(updatedGoal);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//DELETE GOAL
export const deleteGoal = createAsyncThunk(
  "/goal/delete",
  async (goal, thunkAPI) => {
    try {
      const response = await goalServices.deleteGoal(goal);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Goal Reducer
export const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    resetGoal: (state) => {
      //reset goal state;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    return (
      builder //Get Goals Cases
        .addCase(getGoals.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getGoals.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.message = action.payload?.message;
          state.goals = action.payload.goals;
        })
        .addCase(getGoals.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.payload;
        })

        //Get Goal Cases
        .addCase(getGoal.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getGoal.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.goal = action.payload.goal;
        })
        .addCase(getGoal.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          toast.error(action.payload.message);
        })

        //Create goal cases
        .addCase(createGoal.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createGoal.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          toast.success(action.payload.message.toUpperCase());
        })
        .addCase(createGoal.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          toast.error(action.payload.toUpperCase());
        })

        //update goal cases
        .addCase(updateGoal.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateGoal.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          toast.success(action.payload.message.toUpperCase());
        })
        .addCase(updateGoal.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          toast.error(action.payload.toUpperCase());
        })

        //Goal Deletion Cases
        .addCase(deleteGoal.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteGoal.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.goals = state.goals.filter(
            (goal) => goal.id !== action.payload.id
          );
          toast.success(action.payload.message.toUpperCase());
        })
        .addCase(deleteGoal.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          toast.error(action.payload);
        })
    );
  },
});

export const { resetGoal } = goalSlice.actions;

export default goalSlice.reducer;
