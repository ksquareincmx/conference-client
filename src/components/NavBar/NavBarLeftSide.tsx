import React from "react";
import Grid from "@material-ui/core/Grid";

export const NavBarLeftSide: React.SFC = ({ children }) => {
  return (
    <Grid item xs={6} container alignItems="center">
      {children}
    </Grid>
  );
};
