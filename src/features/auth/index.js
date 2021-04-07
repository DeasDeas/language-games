import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    name: null,
    avatar: null
  },
};

const index = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
  },
});

export default index.reducer;
