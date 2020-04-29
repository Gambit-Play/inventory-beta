import { createSelector } from 'reselect';

const selectItems = state => state.items;

// Selects items.currentItems from the state
export const selectCurrentItems = createSelector(
	[selectItems],
	items => items.currentItems
);

// Selects items.isFetching from the state
export const selectIsFetching = createSelector(
	[selectItems],
	items => items.isFetching
);

// Selects a single item based on the 'itemId' input
export const selectSingleItem = itemId =>
	createSelector([selectCurrentItems], currentItems =>
		currentItems.find(item => item.id === itemId)
	);

export const selectItemsTotal = createSelector(
	[selectCurrentItems],
	currentItems =>
		currentItems.reduce((accCost, item) => accCost + item.cost, 0)
);
