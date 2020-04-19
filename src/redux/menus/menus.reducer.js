import MenusActionTypes from './menus.types';

const INITIAL_STATE = {
	currentMenus: null,
	isFetching: false,
	errorMessage: undefined,
};

const menusReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case MenusActionTypes.FETCH_COLLECTIONS_START:
			return {
				...state,
				isFetching: true,
			};
		case MenusActionTypes.FETCH_COLLECTIONS_UPDATE:
			return {
				...state,
				isFetching: true,
			};
		case MenusActionTypes.FETCH_COLLECTIONS_SUCCESS:
			return {
				...state,
				isFetching: false,
				currentMenus: action.payload,
			};
		case MenusActionTypes.FETCH_COLLECTIONS_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload,
			};
		default:
			return state;
	}
};

export default menusReducer;
