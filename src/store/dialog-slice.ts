import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const promptSlice = createSlice({
  name: "dialog",
  initialState: { isOpen: false, restoreLastSession: true },
  reducers: {
    openDialog(state) {
      return { ...state, isOpen: true };
    },
    closeDialog(state) {
      return { ...state, isOpen: false };
    },
    restoreLastSession(state, action: PayloadAction<boolean>) {
      return { ...state, restoreLastSession: action.payload };
    },
  },
});

export const dialogActions = promptSlice.actions;

export default promptSlice;
