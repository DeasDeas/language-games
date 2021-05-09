import { createSelector } from "reselect";
import { GAME_TYPES } from "../../vars/consts";


export const makeSelectSet = () =>
  createSelector(
    (state) => state.game,
    (_, setId) => setId,
    (game, setId) => game.sets.byIds[setId]
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

      return items;
    }
  );

export const makeSelectItemsPosition = () =>
  createSelector(
    (state) => state.game,
    (_, setId) => setId,
    (game, setId) => {
      let items = game.items.allIds.reduce((combiner, item) => {
        if (game.items.byIds[item].set === setId)
          combiner.push(game.items.byIds[item]);
        return combiner;
      }, []);

      if (game.sets.byIds[setId])
        switch (game.sets.byIds[setId].type) {
          case GAME_TYPES.PICTURES: {
            const picturesOrder = items.slice();
            let wordsOrder = items.slice();

            picturesOrder.forEach((item, idx, self) => {
              const position = item.position.picture;

              if (position !== idx) {
                [self[position], self[idx]] = [self[idx], self[position]];
              }
            });

            wordsOrder.forEach((item, idx, self) => {
              const position = item.position.word;

              if (position !== idx) {
                [self[position], self[idx]] = [self[idx], self[position]];
              }
            });

            wordsOrder = wordsOrder.filter((e) =>
              game.sets.byIds[setId].results.every((itemId) => e.id !== itemId)
            )

            return {picturesOrder, wordsOrder};
          }
          default:
            return items.map(item => item.id);
        }
    }
  );

export const selectItem = (state, itemId) => state.game.items.byIds[itemId];
export const selectAllSets = (state) => state.game.sets.allIds;
export const selectSetById = (state, setId) => state.game.sets.byIds[setId];
export const selectSetByIdx = (state, setIdx) => state.game.sets.byIds[state.game.sets.allIds[setIdx]];