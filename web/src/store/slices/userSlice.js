import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from "@/lib/axiosInstance";

// Login user with given credentials
export const login = createAsyncThunk(
  "user/loginUser",
  async (userCred, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth", {
        credential: userCred.credential,
        password: userCred.password
      });
      await thunkAPI.dispatch(restoreUser());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors?.server ||
          error.response?.data?.errors?.login ||
          "An unknown error occurred."
      );
    }
  }
);

// Fetch current user's data
export const restoreUser = createAsyncThunk(
  "user/restoreUser",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/auth");
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors?.server ||
          error.response?.data?.errors?.login ||
          "An unknown error occurred."
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ user, id }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`/users/${id}`, user);
      await thunkAPI.dispatch(restoreUser());
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors?.server ||
          error.response?.data?.errors?.login ||
          "An unknown error occurred."
      );
    }
  }
);

export const logout = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.delete("/auth");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.errors?.login);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(`/users/${userId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.errors?.server || "An unknown error occurred."
      );
    }
  }
);

/* 
REDUX MAP (in progress)
  currentUser: {
    id: string | objectId,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    role: enum ("admin" | "user" | "client"),
    connectAccountId: string,
    subscriptionStatus: enum ("active", "inactive"),
    subscriptionStartDate: date,
    subscriptionEndDate: date,
  } | null
  error: null | string
*/
const initialState = {
  currentUser: null,
  error: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(restoreUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.currentUser = { ...state.currentUser, ...action.payload };
      })
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.currentUser = null;
        state.error = null;
      });
  }
});

export const selectUser = (state) => state.user;
export default userSlice.reducer;