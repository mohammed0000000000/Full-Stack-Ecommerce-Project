import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import registerSlice from './features/registerSlice';
import cartSlice from "./features/cartSlice";
import globalSlice from "./features/globalSlice";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";
import { apiSlice } from "./services/apiSlice";


const persistCartConfiguration = {
  key: "cart",
  storage,

}
const persistedCart = persistReducer(persistCartConfiguration, cartSlice);
export const store = configureStore({
  reducer: {
    cart: persistedCart,
    login: loginSlice,
    register: registerSlice,
    global: globalSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([apiSlice.middleware])
})

export const persister = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

