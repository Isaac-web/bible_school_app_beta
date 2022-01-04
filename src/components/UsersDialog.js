import { useState, useEffect } from "react";
import {
  InputBase,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import * as usersActions from "../store/users";
import AppDialog from "./AppDialog";
import Empty from "./Empty";

const UsersDialog = ({ onUserSelect, open, onClose }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const { data, loading } = useSelector((state) => state.entities.users);

  useEffect(() => {
    dispatch(usersActions.loadUsers());
  }, []);

  const handleSearch = ({ target: input }) => {
    setInput(input.value);
  };

  const handleKeyStrike = ({ key }) => {
    if (key === "Enter" && input.length) {
      dispatch(usersActions.searchUsers(input));
    }
  };

  const handleUserSelect = (item) => {
    if (typeof onUserSelect !== "function")
      return console.log("onUserSelect is not a function.");

    onUserSelect(item);
  };

  return (
    <>
      <AppDialog open={open} onClose={onClose} maxWidth="xs">
        <Box sx={{ height: 30, marginBottom: "10px" }}>
          <InputBase
            placeholder="Search by username..."
            onChange={handleSearch}
            onKeyPress={handleKeyStrike}
            fullWidth
          />
        </Box>
        <Divider />
        <Box
          sx={{
            height: "50vh",
            width: "100%",
            overflow: "auto",
          }}
        >
          <AppList
            data={data}
            secondaryAction={<Button size="small">Add</Button>}
            onItemSelect={handleUserSelect}
          />
        </Box>
      </AppDialog>
    </>
  );
};

export default UsersDialog;

const AppList = ({ data = [], onItemSelect, secondaryAction, ...rest }) => {
  if (!data.length) return <Empty />;
  return data?.map((item, index) => (
    <List dense {...rest}>
      {item && (
        <ListItem key={item._id || index} {...rest} sx={{ cursor: "pointer" }}>
          <ListItemText
            primary={item.firstname + " " + item.lastname}
            secondary={item.email}
            {...rest}
          />
          {secondaryAction && (
            <ListItemSecondaryAction>
              <Button
                onClick={() => onItemSelect(item, index)}
                disabled={
                  item.status === "admin" || item.status === "coordinator"
                }
              >
                Add
              </Button>
            </ListItemSecondaryAction>
          )}
        </ListItem>
      )}
    </List>
  ));
};
