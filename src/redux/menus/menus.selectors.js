import { createSelector } from 'reselect';

const selectMenus = state => state.menus;

// Selects user.currentMenus from the state
export const selectCurrentMenus = createSelector(
	[selectMenus],
	menus => menus.currentMenus
);

// Selects user.isFetching from the state
export const selectIsFetching = createSelector(
	[selectMenus],
	menus => menus.isFetching
);
