import React, { Fragment } from "react";
import { Drawer, withStyles } from "@material-ui/core";

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
  drawerPaper: {
    width: drawerWidth,
    overflowX: "hidden"
  },
  toolbar: theme.mixins.toolbar
});

class DrawerComponent extends React.Component {
  render() {
    const { children, classes: styleClasses } = this.props;
    const { drawer, drawerPaper, toolbar } = styleClasses;

    return (
      <Fragment>
        <Drawer
          className={drawer}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{
            paper: drawerPaper
          }}
        >
          <div className={toolbar} />
          {children}
        </Drawer>
      </Fragment>
    );
  }
}

export const DrawerBookings = withStyles(styles)(DrawerComponent);
