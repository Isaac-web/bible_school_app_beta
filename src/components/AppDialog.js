import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {} from "formik";

const AppDialog = ({
  children,
  dialogActions,
  open,
  onClose,
  title,
  ...rest
}) => {
  return (
    <Dialog open={open} fullWidth maxWidth={"sm"} onClose={onClose} {...rest}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {dialogActions?.map((item, index) => (
          <span key={item._id || index}>{item.content()}</span>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default AppDialog;
