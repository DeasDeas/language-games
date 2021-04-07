import { createSlice } from "@reduxjs/toolkit";
import { GAME_TYPES } from "../../vars/consts";

const initialState = {
  byIds: {
    "item-1": {
      id: "item-1",
      name: "Picture Task 1",
      type: GAME_TYPES.PICTURES,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      ownerId: 1,
    },
    "item-4": {
      id: "item-4",
      name: "Word Task 1",
      type: GAME_TYPES.WORDS,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      ownerId: 1,
    },
    "item-5": {
      id: "item-5",
      name: "Word Task 2",
      type: GAME_TYPES.WORDS,
    },
    "item-6": {
      id: "item-6",
      name: "Word Task 3",
      type: GAME_TYPES.WORDS,
    },
    "item-3": {
      id: "item-3",
      name: "Picture Task 3",
      type: GAME_TYPES.PICTURES,
    },
  },
  allIds: ["item-1", "item-4", "item-5", "item-6", "item-3"],
};

const index = createSlice({
  name: "gameInstances",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default index.reducer;
