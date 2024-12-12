import {configureStore} from "@reduxjs/toolkit";
import {messagesReducer} from "../slices/messageSlice/messageSlice.tsx";

export const store = configureStore({
  reducer: {
    list: messagesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
