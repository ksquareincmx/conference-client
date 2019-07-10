import React from "react";
import Grid from "@material-ui/core/Grid";

export const NavBarRightSide: React.SFC = ({ children }) => {
  return (
    <Grid item xs={6} container direction="row" justify="flex-end" alignItems="center">
      {children}
    </Grid>
  );
};
