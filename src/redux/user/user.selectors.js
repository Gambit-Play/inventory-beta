import { createSelector } from 'reselect';

const selectUser = state => state.user;

// Selects user.currentUser from the state
export const selectCurrentUser = createSelector(
	[selectUser],
	user => user.currentUser
);
