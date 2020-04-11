import { createSelector } from 'reselect';

const selectUi = state => state.ui;

export const selectSideMenu = createSelector([selectUi], ui => ui.sideMenu);

export const selectSideMenuOpen = createSelector(
	[selectSideMenu],
	sideMenu => sideMenu.open
);
