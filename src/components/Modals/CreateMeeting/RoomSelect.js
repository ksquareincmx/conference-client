import React from "react";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { Select, Grid } from "@material-ui/core/";
import cuid from "cuid";

class RoomSelect extends React.Component {
  state = {
    rooms: [],
    roomSelected: ""
  };

  styles = {
    select: {
      width: 150
    }
  };

  handleOnChange = event => {
    this.setState({ roomSelected: event.target.value }, () =>
      this.props.setRoom(event.target.value)
    );
  };
  componentDidMount() {
    this.props.roomService.getListOfRoom().then(rooms => {
      const newRooms = [...rooms];
      this.setState({ rooms: newRooms });
    });
  }

  render() {
    let roomSelect;

    if (this.props.room) {
      const idx =
        this.state.rooms.findIndex(room => {
          return room.name === this.props.room;
        }) + 1;

      roomSelect = (
        <Select
          value={idx}
          onChange={this.handleOnChange}
          style={this.styles.select}
          disabled={this.props.disabled}
        >
          {this.state.rooms.map(room => (
            <MenuItem value={room.id} key={cuid()}>
              {" "}
              {room.name}
            </MenuItem>
          ))}
        </Select>
      );
    } else {
      roomSelect = (
        <Select
          value={this.state.roomSelected}
          onChange={this.handleOnChange}
          style={this.styles.select}
          disabled={this.props.disabled}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Room
          </MenuItem>
          {this.state.rooms.map(room => (
            <MenuItem value={room.id} key={cuid()}>
              {room.name}
            </MenuItem>
          ))}
        </Select>
      );
    }

    return (
      <Grid item xs={6}>
        <FormControl>{roomSelect}</FormControl>
      </Grid>
    );
  }
}

export default RoomSelect;
