import { takeLatest, put, all, call } from 'redux-saga/effects';

// Action Types
import MenusActionTypes from './menus.types';

// Actions
import {
	fetchCollectionsUpdate,
	fetchCollectionsSuccess,
	fetchCollectionsFailure,
} from './menus.actions';

// Firebase utils
import { getCollection } from '../../firebase/firebase.utils';

// Redux
import { sagaMiddleware } from '../store';

/* ================================================================ */
/*  Actions                                                         */
/* ================================================================ */
let unsubscribe;
export function* fetchCollectionAsync({ payload: collectionId }) {
	try {
		const collectionRef = yield getCollection(collectionId);
		unsubscribe = yield collectionRef.onSnapshot(snapshot => {
			// This 'sagaMiddleware' makes it possible to run sagas within a callback
			// Calls the 'fetchCollectionsUpdate' function generator when the 'onSnapshot' fires
			if (collectionId === 'Menus') sagaMiddleware.run(fetchCurrentMenus);

			const data = snapshot.docs.map(doc => doc.data());

			// Calls the success function generator depending on the 'collectionId'
			if (collectionId === 'Menus')
				sagaMiddleware.run(fetchCurrentMenus, data);
		});
	} catch (error) {
		yield put(fetchCollectionsFailure(error.message));
	}
}

export function* fetchCurrentMenus(data) {
	if (!data) yield put(fetchCollectionsUpdate());
	if (data) yield put(fetchCollectionsSuccess(data));
}

export function* removeCollectionListener() {
	yield call(unsubscribe);
}

/* ================================================================ */
/*  Listeners                                                       */
/* ================================================================ */

export function* fetchCollectionStart() {
	yield takeLatest(
		MenusActionTypes.FETCH_COLLECTIONS_START,
		fetchCollectionAsync
	);
}

export function* removeListenerStart() {
	yield takeLatest(
		MenusActionTypes.REMOVE_COLLECTION_LISTENER,
		removeCollectionListener
	);
}

/* ================================================================ */
/*  Root Saga                                                       */
/* ================================================================ */

export default function* menusSagas() {
	yield all([call(fetchCollectionStart), call(removeListenerStart)]);
}
