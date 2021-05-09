import { createSelector } from "reselect";
import { GAME_TYPES } from "../../vars/consts";

export const selectSortedInstances = createSelector(
  (state) => state.gameInstances,
  (gameInstances) => {
    const accum = Object.values(GAME_TYPES).reduce((accum, item) => {
      accum[item] = [];
      return accum;
    }, {});

    return gameInstances.allIds.reduce((combiner, itemId) => {
      const item = gameInstances.byIds[itemId];

      combiner[item.type].push(gameInstances.byIds[itemId])

      return combiner;
    }, {...accum});
  }
);

export const selectInstanceById = (state, itemId) =>
  state.gameInstances.byIds[itemId];