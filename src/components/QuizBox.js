import { useEffect, useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import Timer from "../components/Timer";

import QuestionBox from "./QuestionBox";
import config from "../config.json";
import { changeAnswer, hideAnswers } from "../store/currentModule";
import * as enrollmentService from "../services/enrollmentService";
import * as quizActions from "../store/quiz";

const QuizBox = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const quizDuaration = Date.now() + 300000; // equivalent to 5 minutes
  const [quizDuration, setQuizDuration] = useState(quizDuaration);
  const currentEnrollment = enrollmentService.getcurrentEnrollment();
  const { data: currentModule } = useSelector((state) => state.currentModule);
  const { loading, submitted } = useSelector((state) => state.quiz);

  const handleAnswerChange = (ans, index) => {
    dispatch(changeAnswer(ans, index));
  };

  const handleSubmit = () => {
    if (submitted) return;

    const quizData = {
      moduleId: currentModule._id,
      enrollmentId: currentEnrollment._id,
      questions: currentModule.questions,
    };

    dispatch(quizActions.submitQuiz(quizData));
  };

  useEffect(() => {
    dispatch(hideAnswers());
    setQuizDuration(quizDuaration);
  }, []);


  if (!currentModule.questions.length)
    return (
      <Typography sx={{ margin: "5em 0" }} align="center" variant="body1">
        Sorry. No questions yet.
      </Typography>
    );

  return (
    <Box>
      <Timer date={quizDuration} onComplete={handleSubmit} />
      <Typography variant="body1" gutterBottom>
        Choose the correct answers to the follwing questions.
      </Typography>
      <Box className={classes.container}>
        {currentModule.questions.map((q, index) => (
          <QuestionBox
            key={q._id + index || index}
            question={q.question}
            objectives={q.objectives}
            answer={q.ans.trim()}
            onAnswerChange={(ans) => handleAnswerChange(ans, index)}
          />
        ))}
      </Box>
      <Box>
        <Button disabled={submitted} onClick={handleSubmit}>
          {loading ? (
            <CircularProgress size={20} style={{ color: "white" }} />
          ) : (
            "Submit"
          )}
        </Button>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: `0 0 10px rgba(${config.colors.light})`,
  },
}));

export default QuizBox;
