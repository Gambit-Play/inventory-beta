import { all, call } from 'redux-saga/effects';

import menusSagas from './menus/menus.sagas';
import itemsSagas from './items/items.sagas';
import userSagas from './user/user.sagas';

export default function* rootSaga() {
	yield all([call(menusSagas), call(userSagas), call(itemsSagas)]);
}
