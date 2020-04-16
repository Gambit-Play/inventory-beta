import MenusActionTypes from './menus.types';

export const setMenus = menus => ({
	type: MenusActionTypes.SET_MENUS,
	payload: menus,
});
