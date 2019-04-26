import React from "react";
import { withStyles } from "@material-ui/core/";

const style = theme => ({
  snackBarTextBox: {
    top: 14,
    left: 90,
    width: 335,
    height: 65,
    fontFamily: "helvetica",
    position: "absolute"
  },
  snackBarTextBoxTitle: {
    color: "#535b66",
    fontWeight: "bold",
    fontSize: 14
  },
  snackBarTextBoxBody: {
    color: "#525860",
    marginTop: 4,
    fontSize: 13
  }
});

const SnackBarTextBoxComponent = ({
  title,
  body,
  classes: { snackBarTextBox, snackBarTextBoxTitle, snackBarTextBoxBody }
}) => {
  return (
    <div className={snackBarTextBox}>
      <div className={snackBarTextBoxTitle}>{title}</div>
      <div className={snackBarTextBoxBody}>{body}</div>
    </div>
  );
};

export const SnackBarTextBox = withStyles(style)(SnackBarTextBoxComponent);
