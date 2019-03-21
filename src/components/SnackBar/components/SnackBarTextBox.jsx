import React from "react";
import { withStyles } from "@material-ui/core/";
import classNames from "classnames";

const style = theme => ({
  snackBarText: {
    fontFamily: "helvetica",
    fontsize: 20,
    position: "absolute"
  },
  snackBarTextBoxHeader: {
    color: "#000510",
    position: "absolute",
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 90
  },
  snackBarTextBoxBody: {
    color: "#525860",
    position: "absolute",
    marginTop: 40,
    marginLeft: 90
  }
});

const SnackBarTextBoxComponent = ({
  reason,
  details,
  classes: { snackBarTextBox, snackBarTextBoxHeader, snackBarTextBoxBody },
  overrideClass
}) => {
  return (
    <div className={classNames(snackBarTextBox, overrideClass)}>
      <div className={snackBarTextBoxHeader}>{reason}</div>
      <div className={snackBarTextBoxBody}>{details}</div>
    </div>
  );
};

export const SnackBarTextBox = withStyles(style)(SnackBarTextBoxComponent);
