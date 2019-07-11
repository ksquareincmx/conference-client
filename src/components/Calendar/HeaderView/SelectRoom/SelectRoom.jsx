import React from "react";
import { Button, FormControl, Select, MenuItem, withStyles } from "@material-ui/core";
import { SelectContent } from "./SelectContent";
import cuid from "cuid";

const styles = theme => ({
  button: {
    minWidth: "190px",
    width: "auto",
    height: "52px",
    position: "absolute",
    top: 166,
    backgroundColor: "transparent",
    color: "#808080",
    boxShadow: "none",
    border: "1px solid #808080",
    fontWeight: "bold",
    fontSize: "1rem",
    padding: "6px",
    display: "flex",
    justifyContent: "flex-start"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  select: {
    height: 0,
    width: 0,
    visibility: "hidden"
  },
  optionImg: {
    height: "2.4rem",
    borderRadius: "5px",
    marginRight: "10px"
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

  getRoomNames = rooms => rooms.reduce((acc, curr) => `${acc.name} and ${curr.name}`);

  getOptions = isSingleGrid => {
    const { pairedRooms, roomList } = this.props;
    if (isSingleGrid) {
      return roomList ? this.formatOptions(roomList, isSingleGrid) : null;
    }
    return pairedRooms ? this.formatOptions(pairedRooms) : null;
  };

  render() {
    const { selectedRoom, isSingleGrid, classes: styleClasses } = this.props;
    const { button, formControl, select, optionImg } = styleClasses;
    const options = this.getOptions(isSingleGrid);

    return (
      <form autoComplete="off">
        <Button onClick={this.handleOpen} variant={"contained"} className={button}>
          <SelectContent roomName={selectedRoom[0] ? selectedRoom[0].name : null} />
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
              ? options.map(({ rooms, optionTxt }) => (
                  <MenuItem value={rooms} key={cuid()}>
                    <img className={optionImg} src={`/assets/${optionTxt}.png`} />
                    {optionTxt}
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
