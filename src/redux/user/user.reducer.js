import UserActionTypes from './user.types';

const INITIAL_STATE = {
	currentUser: null,
	allUsers: null,
	isFetching: false,
	errorMessageCurrentUser: undefined,
	errorMessageAllUsers: undefined,
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		/* ================================================================ */
		/*  Current User Reducers                                           */
		/* ================================================================ */
		case UserActionTypes.GOOGLE_SIGNIN_SUCCESS:
			return {
				...state,
				currentUser: action.payload,
			};
		case UserActionTypes.GOOGLE_SIGNOUT_START:
			return {
				...state,
				currentUser: null,
				allUsers: null,
				isFetching: false,
				errorMessageCurrentUser: undefined,
				errorMessageAllUsers: undefined,
			};
		/* ================================================================ */
		/*  All Users Reducers	                                            */
		/* ================================================================ */
		case UserActionTypes.FETCH_ALL_USERS_START:
			return {
				...state,
				isFetching: true,
			};
		case UserActionTypes.FETCH_ALL_USERS_SUCCESS:
			return {
				...state,
				isFetching: false,
				allUsers: action.payload,
			};
		case UserActionTypes.FETCH_ALL_USERS_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessageAllUsers: action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
