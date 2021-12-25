import React from "react";
import CountDown from "react-countdown";
import { Typography } from "@mui/material";

const Timer = ({ duration, ...rest }) => {
  const Renderer = ({ hours, minutes, seconds }) => {
    return (
      <Typography variant="h6">
        {hours} : {minutes} : {seconds}
      </Typography>
    );
  };

  return <CountDown renderer={Renderer} {...rest} />;
};

export default Timer;
