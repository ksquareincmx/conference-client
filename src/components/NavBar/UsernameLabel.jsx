import React from "react";
import { Typography } from "@material-ui/core/";
import capitalize from "lodash/fp/capitalize";

const styles = {
  typography: {
    color: "white",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: 20
  }
};

function UsernameLabel(props) {
  const { username } = props;
  return (
    <Typography style={styles.typography}>{capitalize(username)}</Typography>
  );
}

export default UsernameLabel;
