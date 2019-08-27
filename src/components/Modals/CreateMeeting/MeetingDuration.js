import React from "react";
import { Grid, Button } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import addZeros from "../../../utils/AddZeros";
import moment from "moment";

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

class MeetingDuration extends React.Component {
  state = {
    durationTime: [],
    hourSelected: "",
    minuteSelected: ""
  };

  timeSelectedHandler = (event, startTime) => {
    const onItemSelected = this.state.durationTime;
    console.log(event);
    const addTime = parseInt(event.target.innerText.substring(0, 2));
    const endTime = moment({
      hour: startTime.hour,
      minute: startTime.minute
    }).add(addTime, "minutes");
    this.props.setEndTime({ hour: endTime.hour(), minute: endTime.minute() });
    console.log(endTime.hour(), endTime.minute());
  };

  componentDidMount() {
    const duration = Array.from(new Object(4), (x, i) => [
      addZeros((i + 1) * 15),
      false
    ]);
    console.log(duration);
    this.setState({
      durationTime: duration
    });
  }

  render() {
    const { classes, startTime, disabled } = this.props;
    return (
      <Grid container direction="row">
        <Grid item xs={12}>
          {this.state.durationTime.map((minutes, idx) => {
            return (
              <Button
                selected={minutes[1]}
                key={minutes[0]}
                className={
                  minutes[1] ? classes.selectedTime : classes.defaultTime
                }
                onClick={event =>
                  this.timeSelectedHandler(event, startTime, idx)
                }
              >
                {minutes[0]} min
              </Button>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(MeetingDuration);
