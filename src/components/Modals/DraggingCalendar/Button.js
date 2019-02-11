import React from "react";
import { getButtonStyles } from "./Styles";
import ButtonMaterial from "@material-ui/core/Button";

function Button(props) {
  let styles = getButtonStyles(props.color);

  return (
    <div style={styles.buttonGrid}>
      <ButtonMaterial style={styles.button} onClick={props.onClick}>
        {props.text}
      </ButtonMaterial>
    </div>
  );
}

export default Button;
