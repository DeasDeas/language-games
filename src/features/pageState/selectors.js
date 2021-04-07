import { createSelector } from "reselect";

export const selectPageState = createSelector(
	(state) => state.pageState,
	(pageState) => pageState
);