import React from "react";
import { Typography, withStyles } from "@material-ui/core/";
import capitalize from "lodash/fp/capitalize";

const styles = theme => ({
  label: {
    color: "white",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: 20
  }
});

export const UserNameLabelComponent = ({ username, classes: { label } }) => (
  <Typography className={label}>{capitalize(username)}</Typography>
);

export const UserNameLabel = withStyles(styles)(UserNameLabelComponent);
