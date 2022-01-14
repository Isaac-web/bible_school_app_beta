import React from "react";
import { Paper, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";

const ModuleContentText = ({ title, contentText, hideTitle }) => {
  const theme = useTheme();
  const matchesSX = useMediaQuery(theme.breakpoints.down("sm"));

  const formatText = (text) => {
    const paragraphs = text.split("\n\n");
    return paragraphs.map((p) => (
      <div
        style={{ backgroundColor: "", marginTop: "1em", textAlign: "justify" }}
      >
        {p}
      </div>
    ));
  };

  if (!contentText) return null;

  return (
    <Paper sx={{ padding: `2em ${matchesSX ? "1em" : "5em"}` }}>
      {!hideTitle && (
        <Typography variant="h4" gutterBottom>
          {title || "Content"}
        </Typography>
      )}
      <Typography variant="body1">{formatText(contentText)}</Typography>
    </Paper>
  );
};

export default ModuleContentText;
