import React from "react";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { Select, Grid } from "@material-ui/core/";
import cuid from "cuid";
import { roomService } from "services";

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

  async componentDidMount() {
    const rooms = await roomService.getAll();
    this.setState({ rooms });
  }

  render() {
    const roomSelect = (
      <Select
        value={roomId ? roomId : this.state.roomSelected}
        onChange={this.handleOnChange}
        style={this.styles.select}
        disabled={this.props.disabled}
        displayEmpty={roomId ? false : true}
      >
        {roomId ? (
          " "
        ) : (
          <MenuItem value="" disabled>
            Room
          </MenuItem>
        )}
        {this.state.rooms.map(room => (
          <MenuItem value={room.id} key={cuid()}>
            {room.name}
          </MenuItem>
        ))}
      </Select>
    );

    return (
      <Grid item xs={6}>
        <FormControl>{roomSelect}</FormControl>
      </Grid>
    );
  }
}

export default RoomSelect;
