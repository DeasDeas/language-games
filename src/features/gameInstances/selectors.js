import { createSelector } from "reselect";

export const selectSortedInstances = createSelector(
  (state) => state.gameInstances,
  (gameInstances) => {
    return gameInstances.allIds.reduce((combiner, itemId) => {
    	const item = gameInstances.byIds[itemId];

    	if (combiner.hasOwnProperty(item.type)) {
	      combiner[item.type] = [
	        ...combiner[item.type],
	        gameInstances.byIds[itemId],
	      ];
	    }
    	else {
	      combiner[item.type] = [gameInstances.byIds[itemId]];
	    }
    	
      return combiner;
    }, {});
  }
);