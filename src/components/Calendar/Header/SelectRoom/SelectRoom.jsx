import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  withStyles
} from "@material-ui/core";
import cuid from "cuid";

const styles = theme => ({
  button: {
    width: 200,
    position: "absolute",
    top: 177,
    backgroundColor: "#5294e5",
    color: "white",
    fontSize: 15
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  select: {
    height: 0,
    width: 0,
    visibility: "hidden"
  }
});

class SelectRoomComponent extends React.Component {
  state = {
    selectedIds: "",
    isOpen: false
  };

  handleChange = event => {
    const { onChangeRoomSelect } = this.props;
    const { value } = event.target;
    this.setState({ selectedIds: value });
    onChangeRoomSelect(value);
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  formatOptions = options => {
    return options.map(rooms => {
      const pairedTxt = this.getRoomNames(rooms);
      return { rooms, pairedTxt };
    });
  };

  getRoomNames = rooms =>
    rooms.reduce((acc, curr) => `${acc.name} and ${curr.name}`);

  render() {
    const { selectedRooms, pairedRooms, classes: styleClasses } = this.props;
    const { button, formControl, select } = styleClasses;
    const options = pairedRooms ? this.formatOptions(pairedRooms) : null;

    return (
      <form autoComplete="off">
        <Button
          onClick={this.handleOpen}
          color="primary"
          variant={"contained"}
          className={button}
        >
          {selectedRooms ? this.getRoomNames(selectedRooms) : "Loading..."}
        </Button>
        <FormControl className={formControl}>
          <Select
            open={this.state.isOpen}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.selectedIds}
            onChange={this.handleChange}
            inputProps={{
              name: "roomsSelected",
              id: "controlled-open-select"
            }}
            className={select}
          >
            {options
              ? options.map(pair => (
                  <MenuItem value={pair.rooms} key={cuid()}>
                    {pair.pairedTxt}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
      </form>
    );
  }
}

export const SelectRoom = withStyles(styles)(SelectRoomComponent);
