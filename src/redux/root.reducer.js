import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import uiReducer from './ui/ui.reducer';
import menusReducer from './menus/menus.reducer';
import itemsReducer from './items/items.reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['ui', 'menus', 'user', 'items'],
};

const rootReducer = combineReducers({
	user: userReducer,
	ui: uiReducer,
	menus: menusReducer,
	items: itemsReducer,
});

export default persistReducer(persistConfig, rootReducer);
