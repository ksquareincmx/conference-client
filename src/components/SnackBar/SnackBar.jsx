import React from "react";
import { withStyles } from "@material-ui/core/";

const styles = theme => ({
  snackBar: {
    width: 430,
    height: 85,
    boxShadow: "0px 4px 4px #888888",
    background: "#FFFFFF",
    position: "relative",
    marginTop: 7,
    marginBottom: 10
  }
});

const SUCCESS_COLOR = "green";
const ERROR_COLOR = "red";

const SnackBarComponent = ({ children, variant, classes: { snackBar } }) => {
  const color = variant === "success" ? SUCCESS_COLOR : ERROR_COLOR;
  return (
    <div className={snackBar} style={{ borderTop: `5px solid ${color}` }}>
      {children}
    </div>
  );
};

const SnackBar = withStyles(styles)(SnackBarComponent);
export { SnackBar };
