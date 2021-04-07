import { createSelector } from "reselect";
import { GAME_TYPES } from "../../vars/consts";

export const selectAllSets = createSelector(
  (state) => state.game,
  (game) => game.sets.allIds
);

export const makeSelectSet = () =>
  createSelector(
    (state) => state.game,
    (_, setId) => setId,
    (game, setId) => game.sets.byId[setId]
  );

export const makeSelectSetItems = () =>
  createSelector(
    (state) => state.game,
    (_, setId) => setId,
    (game, setId) => {
      const items = game.items.allIds.reduce((combiner, item) => {
        if (game.items.byIds[item].set === setId)
          combiner.push(game.items.byIds[item]);
        return combiner;
      }, []);

      if (game.sets.byId[setId])
        switch (game.sets.byId[setId].type) {
          case GAME_TYPES.PICTURES: {
            items.forEach((item, idx, self) => {
              const position = item.position;

              if (position !== idx) {
                [self[position], self[idx]] = [self[idx], self[position]];
              }
            });
            return items;
          }
          default:
            return items;
        }

      return items;
    }
  );