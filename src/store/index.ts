import { configureStore } from "@reduxjs/toolkit";

import {
  authApi,
  contactsApi,
  notesApi,
  petsApi,
  userApi,
  vetsApi,
} from "@/services/apis";

import { modalSlice } from "./slices/modalSlice";
import { alertMessageSlice } from "./slices/alertMessageSlice";

import { userSlice } from "./slices/userSlice";
import { eventsApi } from "@/services/apis/eventsApi";

export const store = configureStore({
  reducer: {
    modalStore: modalSlice.reducer,
    alertMessageStore: alertMessageSlice.reducer,
    userStore: userSlice.reducer,

    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [petsApi.reducerPath]: petsApi.reducer,
    [vetsApi.reducerPath]: vetsApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(petsApi.middleware)
      .concat(vetsApi.middleware)
      .concat(contactsApi.middleware)
      .concat(notesApi.middleware)
      .concat(eventsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
