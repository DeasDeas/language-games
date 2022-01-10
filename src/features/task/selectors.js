import { createSelector } from "reselect";
import { GAME_TYPES } from "../../vars/consts";

export const selectSortedTasks = createSelector(
  (state) => state.tasks,
  (tasks) => {
    const accum = Object.values(GAME_TYPES).reduce((accum, item) => {
      accum[item] = [];
      return accum;
    }, {});

    return tasks?.allIds.reduce((combiner, itemId) => {
      const item = tasks?.byIds[itemId];

      combiner[item.game_type].push(tasks?.byIds[itemId])

      return combiner;
    }, {...accum});
  }
);

export const selectInstanceById = (state, itemId) =>
  state.tasks.byIds[itemId];