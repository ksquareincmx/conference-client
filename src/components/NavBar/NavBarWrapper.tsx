import React, { Fragment } from "react";
import { AppBar, Toolbar, Grid, withStyles, createStyles } from "@material-ui/core/";

const styles = createStyles({
  appBar: {
    position: "fixed",
    boxShadow: "none",
    zIndex: 10
  },
  toolBar: {
    backgroundColor: "#3049a1",
    zIndex: 10
  }
});

export interface INavBarWrapperComponentProps {
  classes: {
    appBar: string;
    toolBar: string;
  };
}

const NavBarWrapperComponent: React.SFC<INavBarWrapperComponentProps> = ({
  children,
  classes: { appBar, toolBar }
}) => {
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
