import { configureStore } from "@reduxjs/toolkit";
import polygonSlice from "./polygon-slice";

export const store = configureStore({
  reducer: { polygons: polygonSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
