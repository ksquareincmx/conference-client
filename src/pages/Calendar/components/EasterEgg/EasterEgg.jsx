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
      <p className={EasterEggText}>
        cHRzcy4uLiB0eXBlIGtvbmFtaSBjb2RlIOKGkSDihpEg4oaTIOKGkyDihpAg4oaSIOKGkCDihpIgQiBBIGFuZCBzZWUgdGhlIG1hZ2ljIQ==
      </p>
    </div>
  );
};

export const EasterEgg = withStyles(styles)(EasterEggComponent);
