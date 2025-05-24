import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddle from "redux-saga";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.slide";
import postReducer from "./post/post.slide";
import appReducer from "./app/app.slice";
import countReducer from "./counter/counter.slide";
import rootSaga from "./saga/root.saga";
import userSagaReducer from "./user/user.saga.slide";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["app"],
};

const sagaMiddleware = createSagaMiddle();

const rootReducer = combineReducers({
    users: userReducer,
    post: postReducer,
    app: appReducer,
    count: countReducer,
    usersSaga: userSagaReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
