import { configureStore } from '@reduxjs/toolkit'
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from '../features/auth/authSlice'
import tasksReducer from "../features/task/taskSlice";
import gameReducer from "../features/game/gameSlice";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import {combineReducers} from "redux";

const persistConfig = {
	key: 'root',
	version: 1,
	storage
}


const persistedReducer = persistReducer(persistConfig, combineReducers ({
		auth: authReducer,
		tasks: tasksReducer,
		game: gameReducer,
}))


export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
		}
	})
})

export const persistor = persistStore(store);
