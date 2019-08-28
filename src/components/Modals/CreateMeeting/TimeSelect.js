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
    marginRight: theme.spacing(2)
  }
});

const hoursValues = Array.from(new Array(11), (x, i) => [
  addZeros(8 + i),
  false
]);
const minutesValues = Array.from(new Array(4), (x, i) => [
  addZeros(i * 15),
  false
]);

function handleOnChangeHour(e, minute, onChangeHour) {
  onChangeHour({ hour: e.target.value, minute: minute });
}

function handleOnChangeMinute(e, hour, onChangeMinute) {
  onChangeMinute({ hour: hour, minute: e.target.value });
}

const TimeSelect = ({
  classes,
  hour,
  minute,
  onChangeHour,
  onChangeMinute,
  isInvalidHour
}) => {
  const hours = hoursValues.map(hour => (
    <MenuItem value={hour[0]} key={cuid()}>
      {hour[0]}
    </MenuItem>
  ));
  let minutes = minutesValues.map(hour => (
    <MenuItem value={hour[0]} key={cuid()}>
      {hour[0]}
    </MenuItem>
  ));

  return (
    <Grid container direction="row">
      <Grid item xs={6}>
        <FormControl className={classes.form}>
          <InputLabel>Hour</InputLabel>
          <Select
            value={hour}
            onChange={e => {
              handleOnChangeHour(e, minute, onChangeHour);
            }}
            className={classes.select}
            error={isInvalidHour}
          >
            {hours}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl className={classes.form}>
          <InputLabel>Minutes</InputLabel>
          <Select
            value={minute}
            onChange={e => {
              handleOnChangeMinute(e, hour, onChangeMinute);
            }}
            className={classes.select}
            error={isInvalidHour}
          >
            {minutes}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(TimeSelect);
