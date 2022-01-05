import React, { useState, useEffect } from "react";
import {
  Avatar,
  Container,
  Typography,
  Box,
  InputBase,
  InputAdornment,
  List,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Paper,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";

import Empty from "../components/Empty";
import * as enrollmentActions from "../store/enrollments";
import config from "../config.json";
import NoMatchFound from "../components/NoMatchFound";
import Loading from "../components/Loading";

const AdminEnrollments = () => {
  return (
    <Container>
      <Box>
        <Typography variant="h4">Enrollments</Typography>
      </Box>

      <Box>
        <EnrollmentLists />
      </Box>
    </Container>
  );
};

export default AdminEnrollments;

const EnrollmentLists = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setsearchResults] = useState([]);

  const dispatch = useDispatch();
  const { data: enrollments, loading } = useSelector(
    (state) => state.entities.enrollments
  );

  const handleSearch = ({ target: input }) => {
    setSearchInput(input.value);

    const results = enrollments.filter((item) =>
      item.user.email
        ?.trim()
        .toLowerCase()
        .includes(input.value.trim().toLowerCase())
    );

    setsearchResults(results);
  };

  useEffect(() => {
    dispatch(enrollmentActions.loadAllEnrollments());
  }, []);

  const finalData = searchResults.length ? searchResults : enrollments;

  if (loading) return <Loading />;

  if (!enrollments.length) return <Empty />;

  return (
    <>
      <Box>
        <InputBase
          component={"paper"}
          fullWidth
          elevation={1}
          onChange={handleSearch}
          placeholder="Search by username..."
          startAdornment={
            <InputAdornment position="end" sx={{ padding: "0 0.3em" }}>
              <Search />
            </InputAdornment>
          }
          sx={{
            padding: 1,
            marginBottom: 2,
            backgroundColor: config.colors.light,
            borderRadius: "3px",
          }}
        />
      </Box>

      {!searchResults.length && searchInput ? (
        <NoMatchFound />
      ) : (
        <Paper>
          <List>
            {finalData?.map((item) => (
              <ListItem key={item._id}>
                <ListItemAvatar>
                  <Avatar src={item.user?.profileImg} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${item.user.firstname} ${item.user.lastname} (${item.user.email})`}
                  secondary={item.course.title}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </>
  );
};
