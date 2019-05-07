import React, { Fragment } from "react";
import { Drawer, withStyles, Grid } from "@material-ui/core";
import { DrawerBtn } from "./DrawerBtn";

const drawerWidth = 460;

const styles = theme => ({
  drawer: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    width: drawerWidth,
    flexShrink: 0
  },
  drawerClosed: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: 0,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    overflowX: "hidden"
  },
  btnContainer: {
    minHeight: "100%"
  },
  toolbar: theme.mixins.toolbar
});

class DrawerComponent extends React.Component {
  render() {
    const {
      children,
      isOpen,
      handleOpen,
      handleClose,
      classes: styleClasses
    } = this.props;
    const {
      drawer,
      drawerClosed,
      drawerPaper,
      toolbar,
      btnContainer
    } = styleClasses;

    return (
      <Fragment>
        <Drawer
          className={isOpen ? drawer : drawerClosed}
          variant="persistent"
          anchor="left"
          open={isOpen}
          classes={{
            paper: drawerPaper
          }}
        >
          <div className={toolbar} />
          {children}
        </Drawer>
        <div className={btnContainer}>
          <DrawerBtn
            isOpen={isOpen}
            onClick={isOpen ? handleClose : handleOpen}
          />
        </div>
      </Fragment>
    );
  }
}

export const DrawerBookings = withStyles(styles)(DrawerComponent);
