import React, { Fragment } from "react";
import { AppBar, Toolbar, Grid } from "@material-ui/core/";

const styles = {
  appBar: {
    boxShadow: "none"
  },
  toolBar:{
    backgroundColor: "#3049a1"
  }
};

function NavBarContainer(props) {
  return (
    <Fragment>
      <AppBar position="static" style={styles.appBar}>
        <Toolbar style={styles.toolBar}>
          <Grid container direction="row" justify="flex-end">
            {props.children}
          </Grid>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default NavBarContainer;
