import { all, call } from 'redux-saga/effects';

import menusSaga from './menus/menus.sagas';
import userSaga from './user/user.sagas';

export default function* rootSaga() {
	yield all([call(menusSaga), call(userSaga)]);
}
