import React from "react";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  container: {
    height: "100%",
    margin: 50,
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    alignItems: "center"
  },
  title: {
    fontSize: "6em",
    fontWight: "bold",
    color: "#808080"
  },
  content: {
    fontSize: "2em",
    color: "#e9e9e9",
    textShadow:
      "-1px 0 4px grey, 0 1px 4px grey, 1px 0 4px grey, 0 -1px 4px grey"
  }
});

const Error500Component = props => {
  const { classes: styleClasses } = props;
  const { container, title, content } = styleClasses;

  return (
    <div className={container}>
      <h1 className={title}>Error: 500</h1>
      <div className={content}>
        <h2>We can't connect with the server at this moment.</h2>
        <h2>Try again later.</h2>
      </div>
    </div>
  );
};

export const Error500 = withStyles(styles)(Error500Component);
