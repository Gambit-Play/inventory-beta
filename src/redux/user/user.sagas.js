import { takeLatest, put, all, call } from 'redux-saga/effects';

// Action Types
import UserActionTypes from './user.types';

// Actions
import { fetchAllUsersFailure, fetchAllUsersSuccess } from './user.actions';

// Firebase utils
import { getUsersCollection } from '../../firebase/firebase.utils';

/* ================================================================ */
/*  Reusable Function Generators                                    */
/* ================================================================ */

/* ================================================================ */
/*  Actions                                                         */
/* ================================================================ */

export function* fetchAllUsersCollectioAsync() {
	try {
		const usersCollection = yield getUsersCollection();
		yield put(fetchAllUsersSuccess(usersCollection));
	} catch (error) {
		yield put(fetchAllUsersFailure(error.message));
	}
}

/* ================================================================ */
/*  Listeners                                                       */
/* ================================================================ */

export function* fetchCollectionStart() {
	yield takeLatest(
		UserActionTypes.FETCH_ALL_USERS_START,
		fetchAllUsersCollectioAsync
	);
}

/* ================================================================ */
/*  Root Saga                                                       */
/* ================================================================ */

export default function* userSagas() {
	yield all([call(fetchCollectionStart)]);
}
