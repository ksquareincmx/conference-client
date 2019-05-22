import React from "react";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  EasterEggContainer: {
    display: "flex",
    justifyContent: "center"
  },
  EasterEggText: {
    color: "black",
    marginTop: "1rem"
  }
});

const EasterEggComponent = ({ classes }) => {
  const { EasterEggContainer, EasterEggText } = classes;
  return (
    <div className={EasterEggContainer}>
      <p className={EasterEggText}>{process.env.REACT_APP_EASTER_EGG}</p>
    </div>
  );
};

export const EasterEgg = withStyles(styles)(EasterEggComponent);
