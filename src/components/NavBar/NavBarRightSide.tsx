import React from "react";
import Grid from "@material-ui/core/Grid";

export interface INavBarRightSide {
  children: React.ReactChildren;
}

export const NavBarRightSide: React.FC<INavBarRightSide> = ({ children }) => {
  return (
    <Grid item xs={6} container direction="row" justify="flex-end" alignItems="center">
      {children}
    </Grid>
  );
};
