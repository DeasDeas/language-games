import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import { getData, sendData } from "../thunks/gameMiddleware";
import { nanoid } from "nanoid";
import { ITEM_STATUS } from "../../constants";

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
  currentSet: 0,
  addedSets: [],
  deletedSets: [],
  addedPictures: [],
  changedPictures: [],
  deletedPictures: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    readGameState(state, action) {
      state = {
        ...state,
        ...action.payload,
      };
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

      state.results[setId][position].word = null;
      word && state.sets.byId[setId].wordsOrder.push(word);

      return state;
    },
    switchSet(state, action) {
      const { direction, length } = action.payload;
      let currentSet = state.currentSet;

      switch (direction) {
        case "left": {
          currentSet > 0 && --state.currentSet;
          break;
        }
        case "right": {
          currentSet < length + 1 && ++state.currentSet;
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

      state.results[setId].forEach((item) => {
        item.word && state.sets.byId[setId].wordsOrder.push(item.word);
        item.correct = null;
        item.word = null;
      });

      state.sets.byId[setId].completed = false;
      state.sets.byId[setId].wordsOrder = _.shuffle(
        state.sets.byId[setId].wordsOrder
      );
      --state.sets.byId[setId].repeatable;

      return state;
    },
    pictureAdded(state, action) {
      const { setId, src, word, owner } = action.payload;

      let newId = nanoid(5);
      state.pictures.byId[newId] = {
        id: newId,
        src: src,
        word: word,
        set: setId,
        owmer: owner,
        theme: 1,
        pos: state.sets.byId[setId].picturesOrder.length + 1,
        status: ITEM_STATUS.ADDED,
      };
      state.pictures.allIds.push(newId);
      state.sets.byId[setId].picturesOrder.push(newId);
      state.results[setId].push({ word: word, correct: true });
      state.addedPictures.push(newId);

      return state;
    },
    pictureChanged(state, action) {
      const { id, setId, src, word, owner } = action.payload;
      const oldPicture = state.pictures.byId[id];

      let isNew = !(oldPicture.word == word && oldPicture.src == src);

      state.pictures.byId[id] = {
        ...state.pictures.byId[id],
        src: src,
        word: word,
      };

      if (state.pictures.byId[id].status === ITEM_STATUS.INITIAL && isNew) {
        state.changedPictures.push(id);
        state.pictures.byId[id].status = ITEM_STATUS.CHANGED;
      }

      state.sets.byId[setId].wordsOrder = state.sets.byId[
        setId
      ].wordsOrder.filter((word) => oldPicture.word !== word);

      state.results[setId][
        state.sets.byId[setId].picturesOrder.findIndex((e) => e === id)
      ] = { word: isNew ? word : null, correct: true };

      return state;
    },
    pictureDeleted(state, action) {
      const { id } = action.payload;
      const { set: setId, word } = state.pictures.byId[id];
      const { picturesOrder, wordsOrder } = state.sets.byId[setId];
      const pictureIdx = picturesOrder.findIndex(
        (pictureId) => pictureId === id
      );
      const status = state.pictures.byId[id].status;

      picturesOrder.splice(pictureIdx, 1);
      state.sets.byId[setId].wordsOrder = wordsOrder.filter(
        (arrWord) => arrWord !== word
      );

      delete state.pictures.byId[id];
      state.pictures.allIds = state.pictures.allIds.filter(
        (pictureId) => pictureId !== id
      );
      state.results[setId].splice(pictureIdx, 1);

      if (
        status === ITEM_STATUS.INITIAL ||
        status === ITEM_STATUS.CHANGED
      ) {
        state.deletedPictures.push(id);
      }
      if (status === ITEM_STATUS.ADDED) {
        state.addedPictures = state.addedPictures.filter(
          (picId) => picId !== id
        );
      }

      return state;
    },
    setAdded(state) {
      const MAX_SET_Q = 15;
      if (state.sets.allIds.length >= MAX_SET_Q) {
        return;
      }

      const newId = nanoid(5);
      state.sets.allIds.push(newId);
      state.sets.byId[newId] = {
        id: newId,
        name: newId,
        repeatable: 1,
        picturesOrder: [],
        wordsOrder: [],
        completed: false,
        status: ITEM_STATUS.ADDED
      };
      state.results[newId] = [];
      state.addedSets.push(newId);

      return state;
    },
    setDeleted(state, action) {
      const { id } = action.payload;
      const status = state.sets.byId[id].status;
      const setIdx = state.sets.allIds.findIndex(setId => setId === id)

      if (state.sets.allIds.length == 1) {
        return;
      }

      state.sets.allIds = state.sets.allIds.filter(setId => setId !== id);
      delete state.sets.byId[id];

      if(status === ITEM_STATUS.ADDED) {
        state.addedSets = state.addedSets.filter(setId => setId !== id);
      }
      if(status === ITEM_STATUS.INITIAL) {
        state.deletedSets.push(id);
      }

      if(state.currentSet >= setIdx) {
        --state.currentSet
      }

      [state.addedPictures, state.deletedPictures, state.changedPictures].forEach(array => array.forEach((elem, idx, selfArr) => {
        state.pictures.byId[elem].set === id && selfArr.splice(idx, 1);
      }))

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

      state.currentSet = 0;
      state.addedSets = [];
      state.deletedSets = [];
      state.addedPictures = [];
      state.changedPictures = [];
      state.deletedPictures = [];

      return state;
    },
    [sendData.fulfilled]: (state) => {
      return state;
    }
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
  pictureAdded,
  pictureChanged,
  pictureDeleted,
  setAdded,
  setDeleted
} = gameSlice.actions;
export default gameSlice.reducer;
