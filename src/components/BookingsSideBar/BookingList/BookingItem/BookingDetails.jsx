import React from "react";
import { Grid, withStyles } from "@material-ui/core";

const styles = theme => ({
  userInfo: {
    marginBottom: 10,
    color: "#7A7A7A",
    fontSize: 20
  },
  hourInfo: {
    color: "#A7A7A7"
  }
});

const BookingDetailsComponent = props => {
  const { classes } = props;
  return (
    <Grid container direction={"row"}>
      <div className={classes.userInfo}>{props.userName}</div>
      <div className={classes.hourInfo}>
        {/*"From " + props.startTime + " to " + props.endTime*/}
        {`From ${props.startTime} to ${props.endTime}`}
      </div>
    </Grid>
  );
};

export const BookingDetails = withStyles(styles)(BookingDetailsComponent);
