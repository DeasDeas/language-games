import { paths } from "./paths";

export const PAGE_STATE = {
  PREPARING: "PREPARING",
  LOADING: "LOADING",
  RUNNING: "RUNNING",
  FINISHING: "FINISHING",
};

export const GAME_TYPES = {
  PICTURES: 1,
  WORDS: 2,
  MIXED: 3,
};

export const GAME_TYPES_PATHS = {
  [GAME_TYPES.WORDS]: paths.wordGames,
  [GAME_TYPES.PICTURES]: paths.pictureGames,
};

export const VIEWPORTS = {
  SMALL: 576,
  MEDIUM: 768,
  LARGE: 992,
  XLARGE: 1200,
  XXLARGE: 1400,
};

export const ITEM_STATUS = {
  ADDED: "ADDED",
  DELETED: "DELETED",
  CHANGED: "CHANGED",
  INITIAL: "INITIAL",
};

export const PLACEHOLDER_IMG = {
  src:
    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
  alt:" "
};

export const ANIMATION_SPEED = {
  QUICK: 250,
  MEDIUM: 500,
  SLOW: 1000,
}

export const ITEM_TYPES = {
  WORD: 'WORD'
}

export const LOADING_STATE = {
  IDLE: "IDLE",
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED"
}

export const BLANK_MESSAGE = {
  texts: '',
  type: "blank",
  status: 0,
}