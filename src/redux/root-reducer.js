import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import uiReducer from './ui/ui.reducer';

export default combineReducers({
	user: userReducer,
	ui: uiReducer,
});
