import React from "react";
import { getTimeStyles } from "./Styles";

function Time(props) {
  const styles = getTimeStyles();
  return (
    <div style={styles.timeContainer}>
      <p style={styles.p}>
        <span style={styles.text}>{"From "}</span>
        <span>{props.from}</span>
        <span style={styles.text}>{" To "}</span>
        <span>{props.to}</span>
      </p>
    </div>
  );
}

export default Time;
