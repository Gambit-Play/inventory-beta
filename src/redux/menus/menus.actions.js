import MenusActionTypes from './menus.types';

export const fetchCollectionsStart = () => ({
	type: MenusActionTypes.FETCH_MENUS_COLLECTIONS_START,
});

export const fetchCollectionsUpdate = () => ({
	type: MenusActionTypes.FETCH_MENUS_COLLECTIONS_UPDATE,
});

export const fetchCollectionsSuccess = menus => ({
	type: MenusActionTypes.FETCH_MENUS_COLLECTIONS_SUCCESS,
	payload: menus,
});

export const fetchCollectionsFailure = errorMessage => ({
	type: MenusActionTypes.FETCH_MENUS_COLLECTIONS_FAILURE,
	payload: errorMessage,
});

export const clearMenusStart = () => ({
	type: MenusActionTypes.CLEAR_MENUS_COLLECTIONS,
});

export const removeCollectionListener = () => ({
	type: MenusActionTypes.REMOVE_COLLECTION_LISTENER,
});
