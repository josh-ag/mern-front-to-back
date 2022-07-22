import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "../services/authServices";
import { toast } from "react-toastify";

//get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

//initial state
const initialState = {
  isError: false,
  isSuccess: false,
  message: "",
  isLoading: false,
  user: user || null,
  profile: null,
};

//Register Action
export const register = createAsyncThunk(
  "/auth/register",
  async (regData, thunkAPI) => {
    try {
      return await authServices.register(regData);
    } catch (error) {
      //handle error

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

//Login Action
export const login = createAsyncThunk(
  "/auth/login",
  async (loginData, thunkAPI) => {
    try {
      return await authServices.login(loginData);
    } catch (error) {
      //handle error

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

//Get Profile Action
export const getProfile = createAsyncThunk(
  "/auth/profile",
  async (thunkAPI) => {
    try {
      const response = await authServices.getUserProfile();
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

//Update Action
export const updateProfile = createAsyncThunk(
  "/auth/profile/update",
  async (updateData, thunkAPI) => {
    try {
      const response = await authServices.updateProfile(updateData);
      return response;
    } catch (error) {
      //handle error
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

//logout action
export const logout = createAsyncThunk("/auth/logout", async (thunkAPI) => {
  try {
    await authServices.logOut();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

//Auth Reducer
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      //reset to initial state
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) =>
    builder

      //Register Cases
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        toast.success(action.payload.message.toUpperCase());
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        toast.error(action.payload.toUpperCase());
      })

      //Login Cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        toast.success(action.payload.message.toUpperCase());
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        toast.error(action.payload.toUpperCase());
      })

      //Get User Profile Cases
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.profile = action.payload.user;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      //Update cases
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload.updated;
        toast.success(action.payload.message.toUpperCase());
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        toast.error(action.payload);
      })

      //Logout Cases
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        toast.error("You are logged out".toUpperCase());
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error(action.payload.toUpperCase());
      }),
});

//exports
export const { reset } = authSlice.actions;
export default authSlice.reducer;
