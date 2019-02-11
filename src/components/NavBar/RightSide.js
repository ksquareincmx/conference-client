import React from "react";
import Grid from "@material-ui/core/Grid";

function RightSide(props) {
  return (
    <Grid
      item
      xs={6}
      container
      direction="row"
      justify="flex-end"
      alignItems="center"
    >
      <React.Fragment>{props.children}</React.Fragment>
    </Grid>
  );
}

RightSide.componentName = "rightSide";

export default RightSide;
