import React from "react";
import { Button, withStyles } from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const styles = theme => ({
  icon: {
    width: 50,
    height: 50,
    color: "#5294e5"
  },
  button: {
    backgroundColor: "white"
  }
});

const DrawerBtnComponent = props => {
  const { onClick: handleClick, classes: styleClasses } = props;
  const { icon, button } = styleClasses;
  return (
    <Button
      onClick={handleClick}
      variant="contained"
      color="default"
      className={button}
    >
      <KeyboardArrowRight className={icon} />
    </Button>
  );
};

export const DrawerBtn = withStyles(styles)(DrawerBtnComponent);
