import UiActionTypes from './ui.types';

const INITIAL_STATE = {
	sideMenu: {
		open: false,
	},
	loading: {
		user: false,
		menus: false,
		items: false,
	},
};

const uiReducer = (state = INITIAL_STATE, action) => {
	const { open } = state.sideMenu;
	// const { user, items, menus } = state.loading;

	switch (action.type) {
		case UiActionTypes.TOGGLE_SIDEMENU:
			return {
				...state,
				sideMenu: { open: !open },
			};

		default:
			return state;
	}
};

export default uiReducer;
