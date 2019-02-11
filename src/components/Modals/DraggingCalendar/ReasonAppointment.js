import React from "react";
import { getReasonStyles } from "./Styles";
import TextField from "@material-ui/core/TextField";

const ReasonAppointment = props => {
  const styles = getReasonStyles();
  return (
    <div>
      <div style={styles.reasonAppointment}>Reason for the appointment</div>
      <TextField onChange={props.onChange} />
    </div>
  );
};

export default ReasonAppointment;
