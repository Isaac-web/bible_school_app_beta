import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, InputBase, Box } from "@mui/material";

import * as currentmoduleActions from "../store/currentModule";
import AppDialog from "./AppDialog";
import config from "../config.json";

const AddModuleContentDialog = ({ open, onClose }) => {
  const [content, setcontent] = useState("");
  const dispatch = useDispatch();
  const { data: currentModule } = useSelector((state) => state.currentModule);

  const actions = [
    {
      content: () => (
        <Button onClick={clear} style={{ width: 100 }} variant="outlined">
          Cancel
        </Button>
      ),
    },
    {
      content: () => (
        <Button onClick={handleSubmitContent} style={{ width: 100 }}>
          Save
        </Button>
      ),
    },
  ];

  const handleChange = ({ target: input }) => {
    setcontent(input.value);
  };

  const handleSubmitContent = (e) => {
    e.preventDefault();

    if (!content.length) return;

    dispatch(
      currentmoduleActions.updateModule(currentModule._id, { content }, clear)
    );
  };

  const clear = () => {
    setcontent("");

    onClose();
  };

  return (
    <AppDialog
      title="Add Content"
      open={open}
      onClose={clear}
      dialogActions={actions}
      maxWidth={"lg"}
    >
      <Box sx={{}}>
        <InputBase
          autoFocus
          onChange={handleChange}
          fullWidth
          style={{ backgroundColor: config.colors.light, padding: 10 }}
          variant="filled"
          multiline
          rows={15}
          placeholder="Add content here..."
          name="content"
          value={content}
        />
      </Box>
    </AppDialog>
  );
};

export default AddModuleContentDialog;
