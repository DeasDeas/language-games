import { createSelector } from "reselect";

export const selectCurrentUser =
	createSelector(
		(state) => state.auth,
		(auth) => auth.user
	);

export const selectMessage = (state) => state.auth.message;