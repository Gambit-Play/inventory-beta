import MenusActionTypes from './menus.types';

export const fetchCollectionsStart = collectionId => ({
	type: MenusActionTypes.FETCH_COLLECTIONS_START,
	payload: collectionId,
});

export const fetchCollectionsUpdate = () => ({
	type: MenusActionTypes.FETCH_COLLECTIONS_UPDATE,
});

export const fetchCollectionsSuccess = menus => ({
	type: MenusActionTypes.FETCH_COLLECTIONS_SUCCESS,
	payload: menus,
});

export const fetchCollectionsFailure = errorMessage => ({
	type: MenusActionTypes.FETCH_COLLECTIONS_FAILURE,
	payload: errorMessage,
});

export const removeCollectionListener = () => ({
	type: MenusActionTypes.REMOVE_COLLECTION_LISTENER,
});
