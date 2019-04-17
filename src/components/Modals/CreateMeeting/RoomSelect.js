import React from "react";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { Select, Grid } from "@material-ui/core/";
import cuid from "cuid";
import { roomService } from "services";
import { withNotifications } from "hocs";

class RoomSelectComponent extends React.Component {
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
    try {
      const rooms = await roomService.getAll();
      this.setState({ rooms });
    } catch (error) {
      return onErrorNotification({
        title: "Action failed",
        body: "There was an error with the server"
      });
    }
  }

  render() {
    const { rooms } = this.state;
    const { roomId } = this.props;
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
        {Array.isArray(rooms)
          ? rooms.map(room => (
              <MenuItem value={room.id} key={cuid()}>
                {room.name}
              </MenuItem>
            ))
          : null}
      </Select>
    );

    return (
      <Grid item xs={6}>
        <FormControl>{roomSelect}</FormControl>
      </Grid>
    );
  }
}

export const RoomSelect = withNotifications(RoomSelectComponent);
