import { UiActionTypes } from './ui.types';

const INITIAL_STATE = {
	sideMenu: {
		open: false,
	},
};

const uiReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UiActionTypes.TOGGLE_SIDEMENU:
			return {
				...state,
				sideMenu: { open: !state.sideMenu.open },
			};

		default:
			return state;
	}
};

export default uiReducer;
