import { useEffect, useState } from "react";
import {
  Container,
  Box,
  useMediaQuery,
  Table,
  TableContainer,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputBase,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { makeStyles, useTheme } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";

import * as enrollmentActions from "../store/enrollments";
import config from "../config.json";

const CoordinatorEnrollments = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { data: enrollments } = useSelector(
    (state) => state.entities.enrollments
  );

  useEffect(() => {
    dispatch(enrollmentActions.getCoordinatorEnrollments());
  }, []);

  const handleSearch = ({ target: input }) => {
    setSearchInput(input.value);

    const results = enrollments.filter((item) => {
      let name = item.user.firstname + " " + item.user.lastname;

      if (name.includes(input.value)) return item;
    });

    setSearchResults(results);
  };

  return (
    <Container>
      <Typography variant="h4">Enrollments</Typography>
      <Toolbar className={classes.toolbar}>
        <InputBase
          className={classes.searchbar}
          placeholder="Search by username..."
          fullWidth
          onChange={handleSearch}
          startAdornment={
            <InputAdornment position="start" sx={{ padding: "0 10px" }}>
              <Search />
            </InputAdornment>
          }
        />
      </Toolbar>
      {searchInput.length && !searchResults.length ? (
        <Typography variant="body1" align="center" sx={{ padding: "2em 0" }}>
          No match found
        </Typography>
      ) : (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Course Title</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {enrollments?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{`${item.user.firstname} ${item.user.lastname}`}</TableCell>
                <TableCell>{item.course.title}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  searchbar: {
    backgroundColor: config.colors.light,
    padding: 10,
    borderRadius: theme.spacing(1),
  },
  table: {
    width: "100%",
  },
  toolbar: {
    padding: "1em 0",
  },
}));

export default CoordinatorEnrollments;
