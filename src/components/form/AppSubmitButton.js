import React from "react";
import { Button } from "@mui/material";
import { useFormikContext } from "formik";

const AppSubmitButton = ({ children, ...rest }) => {
  //   const test = useFormikContext();

  return (
    <Button onClick={() => {}} {...rest}>
      {children}
    </Button>
  );
};

export default AppSubmitButton;
