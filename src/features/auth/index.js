import { createSlice } from "@reduxjs/toolkit";
import {logout} from "./middleware";

const initialState = {
  user: {
    id: null,
    username: null,
    avatar: null,
    first_name: null,
    last_name: null,
  }
};

const index = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload
      }
    }
  },
  extraReducers: {
    [logout.fulfilled]: (state, action) => {
      if(action.payload)
        state.user = {
          id: null,
          username: null,
          avatar: null,
          first_name: null,
          last_name: null,
        };
    }
  },
});

export default index.reducer;
export const {setCurrentUser} = index.actions;