import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const composeEnhancers =
	(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			trace: true,
			traceLimit: 25,
		})) ||
	compose;

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger);
}

export const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

export default { store, persistor };
