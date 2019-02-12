import React from "react";
import PropTypes from "prop-types";
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
      />
    </form>
  );
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default DatePickers;
