import React from "react";
import { Typography, withStyles } from "@material-ui/core/";

const styles = theme => ({
  label: {
    color: "white",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: 20
  }
});

export const UserNameLabelComponent = ({ username, classes: { label } }) => (
  <Typography className={label}>{username}</Typography>
);

export const UserNameLabel = withStyles(styles)(UserNameLabelComponent);
