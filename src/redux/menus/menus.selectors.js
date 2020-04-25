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

// Selects a single menu based on the 'menuId' input
export const selectSingleMenu = menuId =>
	createSelector([selectCurrentMenus], currentMenus =>
		currentMenus.find(menu => menu.id === menuId)
	);
