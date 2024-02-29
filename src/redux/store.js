import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { filterReducer } from './filterSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistConfigFilter = {
  key: 'filter',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, contactsReducer);
const persistedReducerFilter = persistReducer(
  persistConfigFilter,
  filterReducer
);

export const store = configureStore({
  reducer: {
    contacts: persistedReducer,
    filter: persistedReducerFilter,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
