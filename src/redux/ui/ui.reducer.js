import UiActionTypes from './ui.types';

const INITIAL_STATE = {
	sideMenu: {
		open: false,
	},
};

const uiReducer = (state = INITIAL_STATE, action) => {
	const { open } = state.sideMenu;

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
