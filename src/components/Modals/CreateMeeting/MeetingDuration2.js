import React from "react";
import { Grid, Button } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import addZeros from "../../../utils/AddZeros";
import moment from "moment";
import { element } from "prop-types";

const styles = theme => ({
  defaultTime: {
    textTransform: "lowercase",
    borderColor: "#CDCDCD",
    borderWidth: "1px"
  },
  selectedTime: {
    textTransform: "lowercase",
    backgroundColor: "#CDCDCD"
  }
});

//Maybe this needs to be in the parent
const timeSelectedHandler = (event, startTime, idx, setEndTime, times) => {
  const onItemSelected = times.map(element => {
    element.selected = false;
    return element;
  });
  let item = onItemSelected[idx];
  item.selected = true;

  const addTime = parseInt(event.target.innerText.substring(0, 2));
  const endTime = moment({
    hour: startTime.hour,
    minute: startTime.minute
  }).add(addTime, "minutes");
  setEndTime({ hour: endTime.hour(), minute: endTime.minute() });

  return {
    times: onItemSelected,
    endTime: {
      hour: endTime.hour(),
      minute: endTime.minute()
    }
  };
};

const MeetingDuration = ({
  classes,
  startTime,
  setEndTime,
  times,
  disabled
}) => {
  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        {times.map((time, idx) => {
          return (
            <Button
              key={time.value}
              className={
                time.selected ? classes.selectedTime : classes.defaultTime
              }
              onClick={event =>
                timeSelectedHandler(event, startTime, idx, setEndTime, times)
              }
            >
              {time.value} min
            </Button>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(MeetingDuration);
