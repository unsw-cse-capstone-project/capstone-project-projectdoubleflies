import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {};

const middleware = [thunk];
const persistConfig = {
	key: 'root',
	storage: storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export let store = createStore(
	persistedReducer,
	initialState,
	compose(
	  applyMiddleware(...middleware),
	)
);

export let persistor = persistStore(store)