import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", userData);
      return response.data;
    } catch (error) {
      const errorMsg = error.response ? error.response.data : error.message;
      console.error("Login Error: ", errorMsg);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/api/auth/register", userData);
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Registration Error: ", error.response);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Fetch User
export const fetchUserData = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/auth/user");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Logout User
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await axiosInstance.post("/api/auth/logout");
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Guest login
export const setGuestUser = createAsyncThunk(
  "auth/setGuestUser",
  async (_, thunkAPI) => {
    const guestUser = {
      id: "guest123",
      name: "Guest User",
      email: "guest@example.com",
    };
    return guestUser;
  }
);

// Create Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })
      // Fetch User
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
      })

      .addCase(setGuestUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
