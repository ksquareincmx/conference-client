import React, { Fragment } from "react";
import { AppBar, Toolbar, Grid } from "@material-ui/core/";

function NavBarContainer(props) {
  const rightSide = props.children.find(
    child => child.type.componentName === "rightSide"
  );
  const leftSide = props.children.find(
    child => child.type.componentName === "leftSide"
  );

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#D3D3D3" }}>
          <Grid container direction="row" justify="space-between">
            {leftSide}
            {rightSide}
          </Grid>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default NavBarContainer;
