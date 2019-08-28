import React from "react";
import { Radio, FormControlLabel } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  timeSelector: {},
  checked: {
    color: "#0000FF"
  }
});

const MeetingDuration = ({ classes, time, onSelectItem, disabled }) => {
  const timeSelectedHandler = time => {
    onSelectItem(time);
  };
  return (
    <FormControlLabel
      control={
        <Radio
          disabled={disabled}
          name="time duration selector"
          value={time.value}
          checked={time.selected}
          color="default"
          className={time.selected ? classes.checked : classes.timeSelector}
          label={time.value}
          onClick={() => {
            timeSelectedHandler(time);
          }}
        />
      }
      label={`${time.value} min`}
    />
  );
};

export default withStyles(styles)(MeetingDuration);
