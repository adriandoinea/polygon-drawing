import React from "react";
import { Button, Dialog, DialogTitle, Stack } from "@mui/material";

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSetIsLastSessionRestored: (data: boolean) => void;
}

const PromptModal = ({
  isOpen,
  onClose,
  onSetIsLastSessionRestored,
}: PromptModalProps) => {
  return (
    <Dialog
      open={isOpen}
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
            onSetIsLastSessionRestored(false);
            onClose();
          }}
        >
          New session
        </Button>
        <Button
          color="success"
          variant="outlined"
          onClick={() => {
            onSetIsLastSessionRestored(true);
            onClose();
          }}
        >
          Resume the last session
        </Button>
      </Stack>
    </Dialog>
  );
};

export default PromptModal;
