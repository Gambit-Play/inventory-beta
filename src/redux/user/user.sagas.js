import { takeLatest, put, all, call } from 'redux-saga/effects';

// Action Types
import UserActionTypes from './user.types';

// Actions
import * as actions from './user.actions';

// Firebase utils
import { getUsersCollection } from '../../firebase/firebase.utils';

/* ================================================================ */
/*  Reusable Function Generators                                    */
/* ================================================================ */

/* ================================================================ */
/*  Actions                                                         */
/* ================================================================ */

export function* fetchAllUsersCollectionAsync() {
	try {
		const usersCollection = yield getUsersCollection();
		yield put(actions.fetchAllUsersSuccess(usersCollection));
	} catch (error) {
		yield put(actions.fetchAllUsersFailure(error.message));
	}
}

/* ================================================================ */
/*  Listeners                                                       */
/* ================================================================ */

export function* fetchAllUsersCollectioStart() {
	yield takeLatest(
		UserActionTypes.FETCH_ALL_USERS_START,
		fetchAllUsersCollectionAsync
	);
}

/* ================================================================ */
/*  Root Saga                                                       */
/* ================================================================ */

export default function* userSagas() {
	yield all([call(fetchAllUsersCollectioStart)]);
}
