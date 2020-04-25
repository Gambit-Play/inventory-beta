import { takeLatest, put, all, call } from 'redux-saga/effects';

// Action Types
import ItemsActionTypes from './items.types';

// Actions
import * as actions from './items.actions';

// Firebase utils
import { getCollection } from '../../firebase/firebase.utils';
import * as COLLECTION_IDS from '../../firebase/collections.ids';

// Redux
import { sagaMiddleware } from '../store';

/* ================================================================ */
/*  Actions                                                         */
/* ================================================================ */
let unsubscribe;
export function* fetchItemsCollectionAsync() {
	try {
		const collectionRef = yield getCollection(COLLECTION_IDS.ITEMS);
		unsubscribe = yield collectionRef.onSnapshot(snapshot => {
			// This 'sagaMiddleware' makes it possible to run sagas within a callback
			// Calls the 'fetchCollectionsUpdate' function generator when the 'onSnapshot' fires
			sagaMiddleware.run(fetchCurrentItems);

			const data = snapshot.docs.map(doc => doc.data());

			// Calls the success function generator depending on the 'collectionId'
			sagaMiddleware.run(fetchCurrentItems, data);
		});
	} catch (error) {
		yield put(actions.fetchItemsCollectionFailure(error.message));
	}
}

export function* fetchCurrentItems(data) {
	if (!data) yield put(actions.fetchItemsCollectionUpdate());
	if (data) yield put(actions.fetchItemsCollectionSuccess(data));
}

export function* removeItemsCollectionListener() {
	yield call(unsubscribe);
}

/* ================================================================ */
/*  Listeners                                                       */
/* ================================================================ */

export function* fetchItemsCollectionStart() {
	yield takeLatest(
		ItemsActionTypes.FETCH_ITEMS_COLLECTIONS_START,
		fetchItemsCollectionAsync
	);
}

export function* removeListenerStart() {
	yield takeLatest(
		ItemsActionTypes.REMOVE_ITEMS_COLLECTION_LISTENER,
		removeItemsCollectionListener
	);
}

/* ================================================================ */
/*  Root Saga                                                       */
/* ================================================================ */

export default function* itemsSagas() {
	yield all([call(fetchItemsCollectionStart), call(removeListenerStart)]);
}
