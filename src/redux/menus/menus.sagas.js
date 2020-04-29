import { takeLatest, put, all, call } from 'redux-saga/effects';

// Action Types
import MenusActionTypes from './menus.types';

// Actions
import * as actions from './menus.actions';

// Firebase utils
import { getCollection } from '../../firebase/firebase.utils';
import * as COLLECTION_IDS from '../../firebase/collections.ids';

// Redux
import { sagaMiddleware } from '../store';

/* ================================================================ */
/*  Actions                                                         */
/* ================================================================ */
let unsubscribe;
export function* fetchCollectionAsync() {
	try {
		const collectionRef = yield getCollection(COLLECTION_IDS.MENUS);
		unsubscribe = yield collectionRef.onSnapshot(snapshot => {
			// This 'sagaMiddleware' makes it possible to run sagas within a callback.
			// Calls the 'fetchCollectionsUpdate' function generator when the 'onSnapshot' fires.
			sagaMiddleware.run(fetchCurrentMenus);

			const data = snapshot.docs.map(doc => doc.data());

			// Calls the success function generator depending on the 'collectionId'.
			sagaMiddleware.run(fetchCurrentMenus, data);
		});
	} catch (error) {
		yield put(actions.fetchCollectionsFailure(error.message));
	}
}

export function* fetchCurrentMenus(data) {
	if (!data) yield put(actions.fetchCollectionsUpdate());
	if (data) yield put(actions.fetchCollectionsSuccess(data));
}

export function* removeCollectionListener() {
	yield call(unsubscribe);
}

/* ================================================================ */
/*  Listeners                                                       */
/* ================================================================ */

export function* fetchCollectionStart() {
	yield takeLatest(
		MenusActionTypes.FETCH_MENUS_COLLECTIONS_START,
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
