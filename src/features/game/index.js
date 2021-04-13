import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import { getData, sendData } from "./gameMiddleware";
import { nanoid } from "nanoid";
import { ITEM_STATUS } from "../../constants";
import { GAME_TYPES } from "../../vars/consts";

const initialState = {
  sets: {
    byIds: {
      "set-1": {
        id: "set-1",
        name: "Set 1",
        description: null,
        type: GAME_TYPES.PICTURES,
        results: ["item-3", null, "item-2", "item-4"],
      },
      "set-2": {
        id: "set-2",
        name: "Set 2",
        description: null,
        type: GAME_TYPES.PICTURES,
        results: [],
      },
      "set-3": {
        id: "set-3",
        name: "Set 3",
        description: null,
        type: GAME_TYPES.PICTURES,
        results: [],
      },
    },
    allIds: ["set-1", "set-2", "set-3"],
  },
  items: {
    byIds: {
      "item-1": {
        id: "item-1",
        image: {
          src:
            "https://res.cloudinary.com/grohealth/image/upload/f_auto,fl_lossy,q_auto/v1583920665/DCUK/Content/iStock-947314334-1000x600.jpg",
          alt: null,
        },
        word: "sun",
        set: "set-1",
        position: 0,
      },
      "item-2": {
        id: "item-2",
        image: {
          src:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/March_evening._The_sun_fell_across_the_Ob_river.jpg/1200px-March_evening._The_sun_fell_across_the_Ob_river.jpg",
          alt: null,
        },
        word: "river",
        set: "set-1",
        position: 2,
      },
      "item-3": {
        id: "item-3",
        image: {
          src:
            "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/weather/cloud/cumulus-cloud.jpg",
          alt: null,
        },
        word: "sky",
        set: "set-1",
        position: 1,
      },
      "item-4": {
        id: "item-4",
        image: {
          src:
            "https://www.boisestatepublicradio.org/sites/idaho/files/201907/city_of_rocks.jpg",
          alt: null,
        },
        word: "rock",
        set: "set-1",
        position: 3,
      },
    },
    allIds: ["item-1", "item-2", "item-3", "item-4"],
  },
};

export const index = createSlice({
  name: "game",
  initialState,
  reducers: {
    addWord: (state, action) => {
      const { setId, position, itemId } = action.payload;

      state.sets.byIds[setId].results[position] = !!itemId ? state.items.byIds[itemId].id : null;
      return state;
    },
  },
});

export const { addWord } = index.actions

export default index.reducer;
