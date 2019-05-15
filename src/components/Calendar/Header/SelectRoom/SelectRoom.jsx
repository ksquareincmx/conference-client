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
    width: "auto",
    position: "absolute",
    top: 177,
    backgroundColor: "#5294e5",
    color: "white",
    fontSize: "1em"
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

  formatOptions = (options, isSingular) => {
    return options.map(rooms => {
      const optionTxt = isSingular ? rooms.name : this.getRoomNames(rooms);
      return { rooms, optionTxt };
    });
  };

  getRoomNames = rooms =>
    rooms.reduce((acc, curr) => `${acc.name} and ${curr.name}`);

  getOptions = isSingleGrid => {
    const { pairedRooms, roomList } = this.props;
    if (isSingleGrid) {
      return roomList ? this.formatOptions(roomList, isSingleGrid) : null;
    }
    return pairedRooms ? this.formatOptions(pairedRooms) : null;
  };

  render() {
    const {
      selectedRooms,
      pairedRooms,
      selectedRoom,
      isSingleGrid,
      classes: styleClasses
    } = this.props;
    const { button, formControl, select } = styleClasses;
    const options = this.getOptions(isSingleGrid);

    return (
      <form autoComplete="off">
        <Button
          onClick={this.handleOpen}
          color="primary"
          variant={"contained"}
          className={button}
        >
          {isSingleGrid
            ? selectedRoom[0]
              ? selectedRoom[0].name
              : "Loading..."
            : selectedRooms
            ? this.getRoomNames(selectedRooms)
            : "Loading..."}
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
              ? options.map(option => (
                  <MenuItem value={option.rooms} key={cuid()}>
                    {option.optionTxt}
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
