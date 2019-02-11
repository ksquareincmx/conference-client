import React from "react";
import { getDateStyles } from "./Styles";

function Date(props) {
  const styles = getDateStyles();
  return (
    <div style={styles.dateContainer}>
      <div style={styles.labels}>
        <div style={styles.text}>{"Day"}</div>
        <div style={styles.text}>{"Month"}</div>
        <div style={styles.text}>{"Year"}</div>
      </div>
      <div style={styles.dateValuesContainer}>
        <div>{props.day}</div>
        <div>{props.month}</div>
        <div>{props.year}</div>
      </div>
    </div>
  );
}
export default Date;
