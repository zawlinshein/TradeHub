import {configureStore, combineReducers} from '@reduxjs/toolkit';
import loginReducer from '../features/signin&out/loginSlice';
import catReducer from '../features/signin&out/anotherSlice';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {reduxStorage} from './storage';

const rootReducer = combineReducers({
  auth: loginReducer,
  cat: catReducer,
});

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
