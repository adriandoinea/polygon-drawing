import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const promptSlice = createSlice({
  name: "dialog",
  initialState: { isOpen: false, restoreLastSession: true },
  reducers: {
    openDialog(state) {
      state.isOpen = true;
    },
    closeDialog(state) {
      state.isOpen = false;
    },
    restoreLastSession(state, action: PayloadAction<boolean>) {
      state.restoreLastSession = action.payload;
    },
  },
});

export const dialogActions = promptSlice.actions;

export default promptSlice;
