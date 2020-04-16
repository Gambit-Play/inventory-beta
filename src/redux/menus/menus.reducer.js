import MenusActionTypes from './menus.types';

const INITIAL_STATE = {
	currentMenus: null,
};

const menusReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case MenusActionTypes.SET_MENUS:
			return {
				...state,
				currentMenus: action.payload,
			};

		default:
			return state;
	}
};

export default menusReducer;
