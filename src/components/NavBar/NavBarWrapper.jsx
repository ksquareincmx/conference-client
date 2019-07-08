import React, { Fragment } from "react";
import { AppBar, Toolbar, Grid, withStyles } from "@material-ui/core/";

const styles = theme => ({
  appBar: {
    position: "fixed",
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1
  },
  toolBar: {
    backgroundColor: "#3049a1",
    zIndex: theme.zIndex.drawer + 1
  }
});

const NavBarWrapperComponent = ({ children, classes: { appBar, toolBar } }) => {
  return (
    <Fragment>
      <AppBar className={appBar} position="static">
        <Toolbar className={toolBar}>
          <Grid container direction="row" justify="flex-end">
            {children}
          </Grid>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export const NavBarWrapper = withStyles(styles)(NavBarWrapperComponent);
