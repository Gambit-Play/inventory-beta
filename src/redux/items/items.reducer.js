import ItemsActionTypes from './items.types';

const INITIAL_STATE = {
	currentItems: null,
	isFetching: false,
	errorMessage: undefined,
};

const itemsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ItemsActionTypes.FETCH_ITEMS_COLLECTIONS_START:
			return {
				...state,
				isFetching: true,
			};
		case ItemsActionTypes.FETCH_ITEMS_COLLECTIONS_UPDATE:
			return {
				...state,
				isFetching: true,
			};
		case ItemsActionTypes.FETCH_ITEMS_COLLECTIONS_SUCCESS:
			return {
				...state,
				isFetching: false,
				currentItems: action.payload,
			};
		case ItemsActionTypes.FETCH_ITEMS_COLLECTIONS_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload,
			};
		case ItemsActionTypes.CLEAR_ITEMS_COLLECTIONS:
			return {
				...state,
				currentItems: null,
				isFetching: false,
				errorMessage: undefined,
			};
		default:
			return state;
	}
};

export default itemsReducer;
