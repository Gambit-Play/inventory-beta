import UserActionTypes from './user.types';

/* ================================================================ */
/*  Current User Actions                                            */
/* ================================================================ */
export const fetchCurrentUserStart = () => ({
	type: UserActionTypes.FETCH_USER_START,
});

export const fetchCurrentUserSuccess = user => ({
	type: UserActionTypes.FETCH_USER_SUCCESS,
	payload: user,
});

export const fetchCurrentUserFailure = errorMessage => ({
	type: UserActionTypes.FETCH_USER_FAILURE,
	payload: errorMessage,
});

/* ================================================================ */
/*  All Users Actions	                                            */
/* ================================================================ */
export const fetchAllUsersStart = () => ({
	type: UserActionTypes.FETCH_ALL_USERS_START,
});

export const fetchAllUsersSuccess = users => ({
	type: UserActionTypes.FETCH_ALL_USERS_SUCCESS,
	payload: users,
});

export const fetchAllUsersFailure = errorMessage => ({
	type: UserActionTypes.FETCH_ALL_USERS_FAILURE,
	payload: errorMessage,
});
