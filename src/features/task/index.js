import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byIds: {
  },
  allIds: [],
};

const index = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTask: (state, action) => {
      state = action.payload
      return state
    },
    addTask: (state, action) => {
      const {id} = action.payload
      state.byIds[id] = {...action.payload, isNew:true};
      state.allIds.unshift(id)
    }
  },
  extraReducers: {},
});

export default index.reducer;
export const { setTask, addTask } = index.actions;
