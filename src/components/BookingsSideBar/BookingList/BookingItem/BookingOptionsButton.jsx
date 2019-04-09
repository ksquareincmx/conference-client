import React from "react";
import { IconButton, withStyles } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const styles = theme => ({
  menuIcon: {
    height: 50,
    width: 20,
    borderRadius: 5
  }
});

const BookingOptionsButtonComponent = ({ classes: { menuIcon }, onClick }) => (
  <IconButton className={menuIcon} onClick={onClick}>
    <MoreVertIcon />
  </IconButton>
);

export const BookingOptionsButton = withStyles(styles)(
  BookingOptionsButtonComponent
);
