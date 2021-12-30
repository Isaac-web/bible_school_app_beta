import React from "react";
import { Container, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";

const CoordinatorEnrollments = () => {
  const theme = useTheme();
  //   const matchesSM = useMediaQuery(theme.breakpoints)
  return (
    <Box
      sx={{
        backgroundColor: "blue",
        marginLeft: (theme) => (theme.breakpoints.up("xs") ? 35 : 0),
      }}
    >
      <Container>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
        velit, doloribus nisi repellendus ipsum quasi quae et esse, veniam
        magnam placeat assumenda a sapiente facilis nam. Nesciunt earum sunt
        quia. Voluptatum quisquam iste vero! Eius dolorem ut, officiis neque
        maxime quaerat voluptates tenetur in modi nam ipsum hic adipisci nihil.
      </Container>
    </Box>
  );
};

export default CoordinatorEnrollments;
