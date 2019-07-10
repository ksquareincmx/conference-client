import React from "react";
import Grid from "@material-ui/core/Grid";

export interface INavBarLeftSideProps {
  children: React.ReactChildren;
}

export const NavBarLeftSide: React.FC<INavBarLeftSideProps> = ({ children }) => {
  return (
    <Grid item xs={6} container alignItems="center">
      {children}
    </Grid>
  );
};
