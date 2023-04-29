import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { modeSlice } from "./mode/mode.slice";
import { authSlice } from "./auth/auth.slice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cartSlice } from "./cart/cart.slice";

const persistConfig = {
  key: "ecommerce",
  storage,
  whitelist: ["mode"],
};

const rootReducer = combineReducers({
  mode: modeSlice.reducer,
  auth: authSlice.reducer,
  cart: cartSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof rootReducer>;
