import React from "react";
import TextField from "@material-ui/core/TextField";

function DatePickers(props) {
  return (
    <form noValidate>
      <TextField
        id="date"
        label="date"
        type="date"
        value={props.date}
        InputLabelProps={{
          shrink: true
        }}
        disabled={props.disabled}
        onChange={props.setDate}
        error={props.isInvalidDate}
      />
    </form>
  );
}

export default DatePickers;
