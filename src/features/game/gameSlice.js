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

export const getData = createAsyncThunk(
  "game/getData",
  async ({ sessionId, sessionInstance }) => {
    const state = {
      session: sessionId,
      sets: null,
      pictures: null,
      results: {},
    };

    state.private = await axios
      .get(`/api/session/${sessionId}/`)
      .then((response) => {
        return (state.isPrivate = response.data.private);
      });

    const sets = await axios
      .get(`/api/session-id/${sessionId}/sets/`)
      .then((response) => {
        let res = [...response.data];
        return (state.sets = {
          byId: res.reduce((accumulator, currentValue) => {
            currentValue.picturesOrder = [];
            accumulator[currentValue.id] = currentValue;
            return accumulator;
          }, {}),
          allIds: res.map((element) => element.id),
        });
      });

    const pictures = await axios
      .get(`/api/session-id/${sessionId}/pictures/`)
      .then((response) => {
        let res = [...response.data];
        return (state.pictures = {
          byId: res.reduce((accumulator, currentValue) => {
            accumulator[currentValue.id] = currentValue;
            return accumulator;
          }, {}),
          allIds: res.map((element) => element.id),
        });
      });

    const setsIds = sets.allIds;
    const picturesIds = pictures.allIds;


    setsIds.forEach((setId) => {
      sets.byId[setId] = {
        id: sets.byId[setId].id,
        name: sets.byId[setId].name,
        repeatable: sets.byId[setId].repeatable,
        picturesOrder: [],
        wordsOrder: [],
        completed: false,
      };
    });

    picturesIds.forEach((pictureId) => {
      const picture = pictures.byId[pictureId];
      const set = sets.byId[picture.set];

      set.picturesOrder.splice(picture.pos - 1, 1, pictureId);

      set.wordsOrder.push(picture.word);
    });

    setsIds.forEach((setId) => {
      const set = sets.byId[setId]

      set.wordsOrder = _.shuffle(set.wordsOrder);

      state.results[setId] = Array(set.picturesOrder.length).fill({
        word: null,
        correct: null,
      });
    });

    state.currentSet = 0;
    window.sessionStorage.setItem(sessionInstance, JSON.stringify(state));

    return state;
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    readGameState(state, action) {
      state = action.payload;
      return state;
    },
    placeWord(state, action) {
      const { setId, word, prevWord, position } = action.payload;

      state.results[setId][position].word = word;
      state.sets.byId[setId].wordsOrder = state.sets.byId[
        setId
      ].wordsOrder.filter((initialWord) => initialWord !== word);
      prevWord && state.sets.byId[setId].wordsOrder.push(prevWord);

      return state;
    },
    returnWord(state, action) {
      const { setId, position, word } = action.payload;
      const setsResults = state.results[setId];

      setsResults[position].word = null;
      word && setsResults.wordsOrder.push(word);

      return state;
    },
    switchSet(state, action) {
      const { direction, length } = action.payload;
      let currentSet = state.currentSet;

      switch (direction) {
        case "left": {
          currentSet > 0 && --currentSet;
          break;
        }
        case "right": {
          currentSet < length + 1 && ++currentSet;
          break;
        }
        default: {
          break;
        }
      }

      return state;
    },
    completeSet(state, action) {
      const { setId, correctWords } = action.payload;

      state.results[setId].forEach(
        (item, idx) => (item.correct = item.word === correctWords[idx])
      );
      state.sets.byId[setId].completed = true;

      return state;
    },
    redoSet(state, action) {
      const setId = action.payload.setId;
      let { completed, wordsOrder, repeatable } = state.sets.byId[setId];

      state.results[setId].forEach((item) => {
        item.word && state.sets.byId[setId].wordsOrder.push(item.word);
        item.correct = null;
        item.word = null;
      });

      completed = false;
      wordsOrder = _.shuffle(wordsOrder);
      --repeatable;

      return state;
    },
  },
  extraReducers: {
    [getData.fulfilled]: (state, action) => {
      let { dataStatus, session, sets, pictures, results } = state;

      dataStatus = "succeeded";
      session = action.payload.session;
      sets = action.payload.sets;
      pictures = action.payload.pictures;
      results = action.payload.results;
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
  setSecureStatus,
} = gameSlice.actions;
export default gameSlice.reducer;
