import ItemsActionTypes from './items.types';

export const fetchItemsCollectionStart = () => ({
	type: ItemsActionTypes.FETCH_ITEMS_COLLECTIONS_START,
});

export const fetchItemsCollectionUpdate = () => ({
	type: ItemsActionTypes.FETCH_ITEMS_COLLECTIONS_UPDATE,
});

export const fetchItemsCollectionSuccess = items => ({
	type: ItemsActionTypes.FETCH_ITEMS_COLLECTIONS_SUCCESS,
	payload: items,
});

export const fetchItemsCollectionFailure = errorMessage => ({
	type: ItemsActionTypes.FETCH_ITEMS_COLLECTIONS_SUCCESS,
	payload: errorMessage,
});

export const removeItemsCollectionListener = () => ({
	type: ItemsActionTypes.REMOVE_ITEMS_COLLECTION_LISTENER,
});
