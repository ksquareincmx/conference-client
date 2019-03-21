import React from "react";
import { withStyles } from "@material-ui/core/";
import classNames from "classnames";

const styles = theme => ({
  snackBar: {
    background: "#FFFFFF",
    position: "relative",
    marginTop: 0
  }
});

const SnackBarComponent = ({
  children,
  variant,
  classes: { snackBar },
  overrideClass
}) => {
  // const green = "#00B390";
  // const red = "#D93045";
  const color = variant === "success" ? "green" : "red";
  return (
    <div
      className={classNames(snackBar, overrideClass)}
      style={{ borderTop: `5px solid ${color}` }}
    >
      {children}
    </div>
  );
};

const SnackBar = withStyles(styles)(SnackBarComponent);
export { SnackBar };
