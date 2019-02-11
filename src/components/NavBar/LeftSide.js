import React from "react";
import Grid from "@material-ui/core/Grid";

function LeftSide(props) {
  return (
    <Grid item xs={6} container alignItems="center">
      <React.Fragment>{props.children}</React.Fragment>
    </Grid>
  );
}

LeftSide.componentName = "leftSide";

export default LeftSide;
