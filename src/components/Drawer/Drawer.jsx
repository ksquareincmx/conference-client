import React, { Fragment } from "react";
import { Drawer, withStyles } from "@material-ui/core";

const DRAWER_WIDTH = 380;

const styles = theme => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    overflowX: "hidden"
  }
});

class DrawerComponent extends React.Component {
  render() {
    const { children, classes: styleClasses } = this.props;
    const { drawer, drawerPaper } = styleClasses;

    return (
      <Drawer
        className={drawer}
        variant="persistent"
        anchor="left"
        open={true}
        classes={{
          paper: drawerPaper
        }}
      >
        {children}
      </Drawer>
    );
  }
}

export const DrawerBookings = withStyles(styles)(DrawerComponent);
