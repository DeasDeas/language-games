import { createSlice } from "@reduxjs/toolkit";
import { PAGE_STATE } from "../../vars/consts";

const initialState = {
  state: PAGE_STATE.RUNNING,
};

const index = createSlice({
  name: "pageState",
  initialState,
  reducers: {
    setPageState: (state, action) => {
      const { newState } = action.payload;
      if (PAGE_STATE.hasOwnProperty(newState)) state = newState;
      return state;
    },
  },
  extraReducers: {},
});

export const { setPageState } = index.actions;

export default index.reducer;
