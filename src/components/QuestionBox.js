import React from "react";
import {
  Box,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import config from "../config.json";

const QuestionBox = ({ question, objectives, answer, onAnswerChange }) => {
  const classes = useStyles();

  const handleRadioChange = (ans) => {
    if (typeof onAnswerChange !== "function")
      return console.error("onAnswerChange is not a function");
    onAnswerChange(ans);
  };

  return (
    <Box>
      <Box className={classes.question}>
        <Typography variant="paragraph">{question}</Typography>
      </Box>
      <Box>
        {objectives.map((ans, index) => (
          <RadioGroup value={answer?.trim()}>
            <FormControlLabel
              key={ans + index || index}
              label={ans}
              control={<Radio />}
              value={ans?.trim()}
              onChange={({ target: radio }) =>
                handleRadioChange(radio.value, index)
              }
            />
          </RadioGroup>
        ))}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  question: {
    padding: theme.spacing(2),
    backgroundColor: config.colors.light,
    color: config.colors.dark,
    borderRadius: theme.spacing(1),
  },
}));

export default QuestionBox;
