import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byIds: {
  },
  allIds: [],
};

const index = createSlice({
  name: "gameInstances",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state = action.payload
      return state
    },
    addItemInstance: (state, action) => {
      const {id} = action.payload
      state.byIds[id] = {...action.payload, isNew:true};
      state.allIds.unshift(id)
    }
  },
  extraReducers: {},
});

export default index.reducer;
export const { setItems, addItemInstance } = index.actions;
