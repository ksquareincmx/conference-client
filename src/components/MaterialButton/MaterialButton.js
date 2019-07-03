import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    color: "white",
    fontSize: 13,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1
  }
});

function MaterialButton({
  classes,
  disabled,
  colorButton: backgroundColor,
  onClick,
  sizeButton,
  textButton
}) {
  const { button: buttonClases } = classes;

  if (disabled) {
    backgroundColor = "#bbb";
  }
  return (
    <Button
      className={buttonClases}
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      size={sizeButton}
      style={{ backgroundColor }}
    >
      {textButton}
    </Button>
  );
}

export default withStyles(styles)(MaterialButton);
