import React from "react";
import { Button, withStyles } from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const styles = theme => ({
  icon: {
    width: 25,
    height: 25,
    color: "#808080"
  },
  button: {
    position: "absolute",
    zIndex: 5,
    // minHeight: "100%",
    minHeight: `calc(100% - 64px)`,
    minWidth: 30,
    padding: 0,
    backgroundColor: "white",
    borderRadius: 0
  }
});

const DrawerBtnComponent = props => {
  const { onClick: handleClick, isOpen, classes: styleClasses } = props;
  const { icon, button } = styleClasses;
  return (
    <Button
      onClick={handleClick}
      variant="contained"
      color="default"
      className={button}
    >
      {isOpen ? (
        <KeyboardArrowLeft className={icon} />
      ) : (
        <KeyboardArrowRight className={icon} />
      )}
    </Button>
  );
};

export const DrawerBtn = withStyles(styles)(DrawerBtnComponent);
