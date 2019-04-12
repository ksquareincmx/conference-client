import React, { Fragment } from "react";
import { Drawer, withStyles, Grid } from "@material-ui/core";
import { DrawerBtn } from "./DrawerBtn";

const drawerWidth = 461;

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
    width: drawerWidth
  }
});

class DrawerComponent extends React.Component {
  state = {
    isOpen: false
  };

  handleDrawerOpen = () => {
    this.setState({ isOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ isOpen: false });
  };
  render() {
    const { children, classes: styleClasses } = this.props;
    const { drawer, drawerClosed, drawerPaper } = styleClasses;
    const { isOpen } = this.state;
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
          {children}
          {/* <DrawerBtn onClick={this.handleDrawerClose} /> */}
        </Drawer>
        <DrawerBtn
          onClick={isOpen ? this.handleDrawerClose : this.handleDrawerOpen}
        />
      </Fragment>
    );
  }
}

export const DrawerBookings = withStyles(styles)(DrawerComponent);
