import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

const PromptDialog = ({
  open,
  onClose,
  title,
  message,
  onAccept,
  acceptLabel,
  declineLabel,
  ...rest
}) => {
  const raiseAccept = () => {
    if (typeof onAccept !== "function")
      return console.error("onAccept is not a function.");
    onAccept();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" {...rest}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          onClick={() => onClose()}
          variant="outlined"
          style={{ textTransform: "none", width: 100 }}
        >
          {declineLabel || "No"}
        </Button>
        <Button
          style={{ width: 100 }}
          size="small"
          onClick={raiseAccept}
          style={{ textTransform: "none", width: 100 }}
        >
          {acceptLabel || "Yes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PromptDialog;
