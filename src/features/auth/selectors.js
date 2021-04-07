import { createSelector } from "reselect";

export const selectedCurrentUser =
	createSelector(
		(state) => state.auth,
		(auth) => auth.user
	);