import React from "react";
import { TextField } from "@mui/material";
import { useFormikContext } from "formik";

const AppTextField = ({ name, ...rest }) => {
  const { values, handleChange, touched, errors } = useFormikContext();
  return (
    <TextField
      value={values[name]}
      onChange={handleChange(name)}
      error={touched[name] && errors[name] ? true : false}
      helperText={touched[name] && errors[name]}
      {...rest}
    />
  );
};

export default AppTextField;
