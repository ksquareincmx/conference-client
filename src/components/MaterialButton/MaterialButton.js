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

function MaterialButton(props) {
  const { classes } = props;
  let backgroundColor = props.colorButton;

  if (props.disabled) {
    backgroundColor = "#bbb";
  }
  return (
    <Button
      className={classes.button}
      variant="contained"
      onClick={props.onClick}
      disabled={props.disabled}
      size={props.sizeButton}
      style={{ backgroundColor }}
    >
      {props.textButton}
    </Button>
  );
}

export default withStyles(styles)(MaterialButton);
