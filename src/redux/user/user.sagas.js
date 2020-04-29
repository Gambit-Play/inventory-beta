import { takeLatest, put, all, call } from 'redux-saga/effects';

// Action Types
import UserActionTypes from './user.types';

// Actions
import * as userActions from './user.actions';
import * as menusActions from '../menus/menus.actions';
import * as itemsActions from '../items/items.actions';

// Firebase utils
import {
	getUsersCollection,
	signInWithGoogle,
	signOutFromGoogle,
} from '../../firebase/firebase.utils';

/* ================================================================ */
/*  Reusable Function Generators                                    */
/* ================================================================ */

/* ================================================================ */
/*  Actions                                                         */
/* ================================================================ */

export function* fetchAllUsersCollectionAsync() {
	try {
		const usersCollection = yield getUsersCollection();
		yield put(userActions.fetchAllUsersSuccess(usersCollection));
	} catch (error) {
		yield put(userActions.fetchAllUsersFailure(error.message));
	}
}

export function* signInWithGoogleStart() {
	try {
		yield call(signInWithGoogle);
		yield put(menusActions.fetchCollectionsStart());
		yield put(itemsActions.fetchItemsCollectionStart());
		yield put(userActions.fetchAllUsersStart());
	} catch (error) {
		console.log(error.message);
	}
}

export function* signOutFromGoogleStart() {
	try {
		yield call(signOutFromGoogle);
		yield put(menusActions.clearMenusStart());
		yield put(itemsActions.clearItemsStart());
	} catch (error) {
		console.log(error.message);
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

export function* onGoogleSignInStart() {
	yield takeLatest(
		UserActionTypes.GOOGLE_SIGNIN_START,
		signInWithGoogleStart
	);
}

export function* onGoogleSignOutStart() {
	yield takeLatest(
		UserActionTypes.GOOGLE_SIGNOUT_START,
		signOutFromGoogleStart
	);
}

/* ================================================================ */
/*  Root Saga                                                       */
/* ================================================================ */

export default function* userSagas() {
	yield all([
		call(fetchAllUsersCollectioStart),
		call(onGoogleSignInStart),
		call(onGoogleSignOutStart),
	]);
}
