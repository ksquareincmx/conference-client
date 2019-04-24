import React from "react";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import { Grid } from "@material-ui/core";

function DatePickers(props) {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Grid container>
        <DatePicker
          margin="normal"
          label="Date picker"
          value={props.date ? props.date : new Date()}
          disabled={props.disabled}
          onChange={props.setDate}
          error={props.isInvalidDate}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default DatePickers;
