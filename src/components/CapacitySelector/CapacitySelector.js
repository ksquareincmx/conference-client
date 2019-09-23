import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Select, Grid, Button } from "@material-ui/core/";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(0.3),
    minWidth: 150
  }
}));

export default function ControlledOpenSelect({ capacity, handleGuests }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function handleChange(event) {
    handleGuests(event.target.value);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  return (
    <form autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select">Guests</InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={capacity}
          onChange={handleChange}
        >
          {/* todo: Make this smarter */}
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={11}>11</MenuItem>
          <MenuItem value={12}>12</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}
