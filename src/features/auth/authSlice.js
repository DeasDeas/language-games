import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: { pk: -1 },
  status: "idle",
  authenticated: true,
  registerState: "idle",
};

export const logout = createAsyncThunk("auth/logout", async () => {
  return await axios.post(`/dj-rest-auth/logout/`, {}).then((response) => {
    return response.data;
  });
});

export const authenticateUser = createAsyncThunk(
  "auth/logIn",
  async (userData) => {
    return await axios
      .post(`/dj-rest-auth/login/`, userData)
      .then((response) => response.data.user);
  }
);

export const getUser = createAsyncThunk("auth/chekLogin", async () => {
  try {
    try {
      await axios.post(`/dj-rest-auth/token/verify/`, {});
    } catch {
      await axios.post(`/dj-rest-auth/token/refresh/`, {}).catch((err) => {
        throw err;
      });
    }
  } catch (err) {
    window.localStorage.setItem(`userId`, JSON.stringify(-1));
    throw err;
  }

  const user = await axios.get(`/dj-rest-auth/user/`).then((response) => {
    return response.data;
  });

  window.localStorage.setItem(`userId`, user.pk);

  return user;
});

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    return await axios
      .post(`/dj-rest-auth/registration/`, userData)
      .then((response) => {
        return response.data;
      });
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.registerState = "succeeded";
    },
    [registerUser.rejected]: (state, action) => {
      state.user = action.payload;
      state.registerState = "failed";
    },
    [registerUser.pending]: (state, action) => {
      state.user = action.payload;
      state.registerState = "loading";
    },
    [logout.fulfilled]: (state) => {
      state.authenticated = false;
    },
    [authenticateUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.hasRefreshToken = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
      state.authenticated = true;
    },
    [getUser.rejected]: (state) => {
      state.status = "failed";
      state.authenticated = false;
    },
    [getUser.pending]: (state) => {
      state.status = "loading";
    },
  },
});

export default authSlice.reducer;
