import { paths } from "./paths";

export const PAGE_STATE = {
  PREPARING: "PREPARING",
  LOADING: "LOADING",
  RUNNING: "RUNNING",
  FINISHING: "FINISHING",
};

export const GAME_TYPES = {
  WORDS: "WORDS",
  PICTURES: "PICTURES",
  SOMETHING: "SOMETHING",
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
  alt:"placeholder"
};