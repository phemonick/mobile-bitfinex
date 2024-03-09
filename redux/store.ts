import { api } from "@/api";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import book from "./book";


const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      book: book
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(api.middleware),
  });

  setupListeners(store.dispatch);

export default store

export type RootState = ReturnType<typeof store.getState>;