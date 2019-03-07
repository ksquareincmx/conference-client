import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Select, Grid } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import addZeros from "../../../utils/AddZeros";
import cuid from "cuid";

const styles = theme => ({
  select: {
    width: 75,
    whiteSpace: "pre"
  },
  form: {
    marginRight: theme.spacing.unit * 2
  }
});

class TimeSelect extends React.Component {
  state = {
    hourSelected: "",
    minuteSelected: "",
    disabledMinutes: true,
    hours: [],
    minutes: []
  };

  MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
        width: 50
      }
    }
  };

  timeFormat() {
    let time = {
      hour: this.state.hourSelected,
      minute: this.state.minuteSelected
    };
    return time;
  }

  hourChangedHandler = event => {
    this.setState(
      {
        hourSelected: event.target.value,
        disabledMinutes: false
      },
      () => this.props.setTime(this.timeFormat())
    );
  };

  minuteChangedHandler = event => {
    this.setState({ minuteSelected: event.target.value }, () =>
      this.props.setTime(this.timeFormat())
    );
  };

  componentDidMount() {
    const hoursArray = Array.from(new Array(11), (x, i) => [
      addZeros(8 + i),
      false
    ]);
    const minutesArray = Array.from(new Array(4), (x, i) => [
      addZeros(i * 15),
      false
    ]);

    this.setState({
      hours: hoursArray,
      minutes: minutesArray
    });
  }

  componentDidUpdate() {
    if (this.props.startTime) {
      if (!this.state.hourSelected) {
        this.setState({
          hourSelected: this.props.startTime.hour,
          minuteSelected: this.props.startTime.minute,
          disabledMinutes: false
        });
      }
    } else if (this.props.endTime) {
      if (!this.state.hourSelected) {
        this.setState({
          hourSelected: this.props.endTime.hour,
          minuteSelected: this.props.endTime.minute,
          disabledMinutes: false
        });
      }
    }
  }

  render() {
    const { classes } = this.props;
    let hours = this.state.hours.map(hour => (
      <MenuItem value={hour[0]} key={cuid()}>
        {hour[0]}
      </MenuItem>
    ));

    let minutes = this.state.minutes.map(minute => (
      <MenuItem value={minute[0]} key={cuid()}>
        {" "}
        {minute[0]}
      </MenuItem>
    ));

    return (
      <Grid container direction="row">
        <Grid item xs={6}>
          <FormControl className={classes.form}>
            <InputLabel>Hour</InputLabel>
            <Select
              value={this.state.hourSelected}
              onChange={this.hourChangedHandler}
              className={classes.select}
              MenuProps={this.MenuProps}
              disabled={this.props.disabledHour}
              error={this.props.isInvalidHour}
            >
              {hours}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl className={classes.form}>
            <InputLabel>Minutes</InputLabel>
            <Select
              value={this.state.minuteSelected}
              onChange={this.minuteChangedHandler}
              className={classes.select}
              disabled={this.state.disabledMinutes}
              error={this.props.isInvalidHour}
            >
              {minutes}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(TimeSelect);
