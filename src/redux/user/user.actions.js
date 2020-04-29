import UserActionTypes from './user.types';

/* ================================================================ */
/*  Current User Actions                                            */
/* ================================================================ */
export const fetchCurrentUserStart = () => ({
	type: UserActionTypes.GOOGLE_SIGNIN_START,
});

export const fetchCurrentUserSuccess = user => ({
	type: UserActionTypes.GOOGLE_SIGNIN_SUCCESS,
	payload: user,
});

export const fetchCurrentUserFailure = errorMessage => ({
	type: UserActionTypes.GOOGLE_SIGNIN_FAILURE,
	payload: errorMessage,
});

export const userGoogleLogoutStart = () => ({
	type: UserActionTypes.GOOGLE_SIGNOUT_START,
});

export const removeUserListener = () => ({
	type: UserActionTypes.REMOVE_USER_LISTENER,
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
