import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

const initialState = {
  session: null,
  sets: {
    byId: {},
    allIds: [],
  },
  pictures: {
    byId: {},
    allIds: [],
  },
  dataStatus: "idle",
  results: {
    setId: [],
  },
};

export const getData = createAsyncThunk("game/getData", async ({sessionId, userId}) => {
  const state = {
    session: sessionId,
    sets: null,
    pictures: null,
    results: {},
  };

  state.private = await axios
    .get(`/api/session/${sessionId}/`)
    .then((response) => {
      return state.isPrivate = response.data.private;
    });

  const sets = await axios
    .get(`/api/session-id/${sessionId}/sets/`)
    .then((response) => {
      let res = [...response.data];
      return state.sets = {
        byId: res.reduce((accumulator, currentValue) => {
          currentValue.picturesOrder = [];
          accumulator[currentValue.id] = currentValue;
          return accumulator;
        }, {}),
        allIds: res.map((element) => element.id),
      };
    });

  const pictures = await axios
    .get(`/api/session-id/${sessionId}/pictures/`)
    .then((response) => {
      let res = [...response.data];
      return state.pictures = {
        byId: res.reduce((accumulator, currentValue) => {
          accumulator[currentValue.id] = currentValue;
          return accumulator;
        }, {}),
        allIds: res.map((element) => element.id),
      };
    });


  sets.allIds.forEach((setId) => {
    sets.byId[setId] = {
      id: sets.byId[setId].id,
      name: sets.byId[setId].name,
      repeatable: sets.byId[setId].repeatable,
      picturesOrder: [],
      wordsOrder: [],
      completed: false,
    };
  });

  pictures.allIds.forEach((pictureId) => {
    const set = sets.byId[pictures.byId[pictureId].set]
    set.picturesOrder.splice(
      pictures.byId[pictureId].pos - 1,
      1,
      pictureId
    );

    set.wordsOrder.push(
      pictures.byId[pictureId].word
    );
  });

  sets.allIds.forEach((setId) => {
    sets.byId[setId].wordsOrder = _.shuffle(sets.byId[setId].wordsOrder);

    state.results[setId] = Array(sets.byId[setId].picturesOrder.length).fill({
      word: null,
      correct: null,
    });
  });

  state.currentSet = 1;
  state.userId = userId;

  window.localStorage.setItem(`${state.session}`, JSON.stringify(state));

  return state;
});

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setSecureStatus(state, action) {
      state.isPrivate = action.payload.secureStatus;
      return state;
    },
    readGameState(state, action) {
      state = action.payload;
      return state;
    },
    placeWord(state, action) {
      state.results[action.payload.setId][action.payload.position].word =
        action.payload.word;
      state.sets.byId[action.payload.setId].wordsOrder = state.sets.byId[
        action.payload.setId
      ].wordsOrder.filter((word) => word !== action.payload.word);


      action.payload.prevWord &&
        state.sets.byId[action.payload.setId].wordsOrder.push(
          action.payload.prevWord
        );

      return state;
    },
    returnWord(state, action) {
      state.results[action.payload.setId][action.payload.position].word = null;

      action.payload.word &&
        state.sets.byId[action.payload.setId].wordsOrder.push(
          action.payload.word
        );

      return state;
    },
    switchSet(state, action) {
      switch (action.payload.direction) {
        case "left": {
          state.currentSet > 1 && --state.currentSet;
          break;
        }
        case "right": {
          state.currentSet < action.payload.length && ++state.currentSet;
          break;
        }
        default: {
          break;
        }
      }

      return state;
    },
    completeSet(state, action) {
      state.results[action.payload.setId].forEach(
        (item, idx) =>
          (item.correct = item.word === action.payload.correctWords[idx])
      );

      state.sets.byId[action.payload.setId].completed = true;
      window.localStorage.setItem(state.session, JSON.stringify(state));
      return state;
    },
    redoSet(state, action) {
      state.results[action.payload.setId].forEach((item) => {
        item.word && state.sets.byId[action.payload.setId].wordsOrder.push(item.word);
        item.correct = null;
        item.word = null;
      });

      state.sets.byId[action.payload.setId].completed = false;
      state.sets.byId[action.payload.setId].wordsOrder = _.shuffle(
        state.sets.byId[action.payload.setId].wordsOrder
      );

      --state.sets.byId[action.payload.setId].repeatable;

      return state;
    },
  },
  extraReducers: {
    [getData.fulfilled]: (state, action) => {
      state.dataStatus = "succeeded";
      state.session = action.payload.session;
      state.sets = action.payload.sets;
      state.pictures = action.payload.pictures;
      state.results = action.payload.results;
      state.dataStatus = "idle";
      return state;
    },
  },
});

export const {
  readGameState,
  placeWord,
  returnWord,
  switchSet,
  completeSet,
  redoSet,
  setSecureStatus
} = gameSlice.actions;
export default gameSlice.reducer;
