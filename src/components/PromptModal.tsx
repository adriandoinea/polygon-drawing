import React from "react";
import { Button, Dialog, DialogTitle, Stack } from "@mui/material";
import { dialogActions } from "../store/dialog-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

const PromptModal = () => {
  const dialog = useSelector((state: RootState) => state.dialog);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(dialogActions.closeDialog());
  };

  return (
    <Dialog
      open={dialog.isOpen}
      PaperProps={{ sx: { position: "fixed", top: 10, m: 0 } }}
    >
      <DialogTitle>
        Would you like to restore the previous session or create a new one?
      </DialogTitle>

      <Stack
        direction="row"
        justifyContent="center"
        columnGap="10px"
        marginBottom="10px"
      >
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(dialogActions.restoreLastSession(false));
            handleClose();
          }}
        >
          New session
        </Button>
        <Button
          color="success"
          variant="outlined"
          onClick={() => {
            dispatch(dialogActions.restoreLastSession(true));
            handleClose();
          }}
        >
          Resume the last session
        </Button>
      </Stack>
    </Dialog>
  );
};

export default PromptModal;
