import React from 'react';
import Button from '@material-ui/core/Button';

function MaterialButton(props) {

  const styles = {
    button: {
      color: 'white',
      fontSize: 13,
      fontFamily: 'roboto',
      backgroundColor: props.colorButton,
      marginRight: 20,
      marginBottom: 20,
    }
  };
  if (props.disabled) {
    styles.button.backgroundColor = '#bbb'
  }
  return (
    <Button
      style={styles.button}
      variant="contained"
      onClick={props.onClick}
      disabled={props.disabled}
    >

      {props.textButton}
    </Button>)
};

export default (MaterialButton);