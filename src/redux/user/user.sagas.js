import { takeLatest, put, all, call } from 'redux-saga/effects';

// Action Types
import UserActionTypes from './user.types';

// Actions
import { setCurrentUser } from './user.actions';

// Firebase utils
import {
	auth,
	googleProvider,
	createUserProfileDocument,
} from '../../firebase/firebase.utils';

/* ================================================================ */
/*  Reusable Function Generators                                    */
/* ================================================================ */

/* ================================================================ */
/*  Actions                                                         */
/* ================================================================ */

/* ================================================================ */
/*  Listeners                                                       */
/* ================================================================ */

/* ================================================================ */

export function* userSagas() {
	yield all([call()]);
}
