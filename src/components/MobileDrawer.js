import { SwipeableDrawer } from "@mui/material";

const MobileDrawer = ({ open, onOpen, onClose, children, ...rest }) => {
  return (
    <>
      <SwipeableDrawer
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        anchor="bottom"
        {...rest}
      >
        {children}
      </SwipeableDrawer>
    </>
  );
};

export default MobileDrawer;
