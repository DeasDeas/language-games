import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  sessions: [],
  sessionInstance: {},
  userSessionStatus: "idle",
  defaultSessionStatus: "idle",
};

export const getUsersSessions = createAsyncThunk(
  "task/getUsersSessions",
  async (userId) => {
    return await axios
      .get(`/api/sessions/owner/${userId}/`)
      .then((response) => {
        return response.data;
      })
  }
);

export const getDefaultSessions = createAsyncThunk(
  "task/getDefaultSessions",
  async () => {
    return await axios
      .get(`/api/sessions/no-owner/`)
      .then((response) => {
        return response.data;
      });
  }
);


export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: {
    [getUsersSessions.fulfilled]: (state, action) => {
      state.sessions.push(...action.payload);
      state.userSessionStatus = "succeeded";
    },
    [getUsersSessions.rejected]: (state) => {
      state.userSessionStatus = "failed";
    },
    [getUsersSessions.pending]: (state) => {
      state.userSessionStatus = "loading";
    },
    [getDefaultSessions.fulfilled]: (state, action) => {
      state.sessions.push(...action.payload);
      state.defaultSessionStatus = "succeeded";
    },
    [getDefaultSessions.rejected]: (state) => {
      state.defaultSessionStatus = "failed";
    },
    [getDefaultSessions.pending]: (state) => {
      state.defaultSessionStatus = "loading";
    },
  },
});

export default taskSlice.reducer