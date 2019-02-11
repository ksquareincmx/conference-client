import React from "react";
import RoomCard from "./RoomCard/";
import GridList from "@material-ui/core/GridList";
import * as RoomMapper from "mappers/RoomMapper";
import "./RoomList.css";

class RoomList extends React.Component {
  state = {
    roomItems: []
  };

  async componentDidMount() {
    const roomList = await this.props.roomService.getListOfRoom();
    const roomListWithColor = RoomMapper.toRoomsWithColor(roomList);

    this.setState({ roomItems: roomListWithColor });
  }

  render() {
    const rooms = this.state.roomItems.map(room => (
      <RoomCard
        roomName={room.name}
        backgroundColor={room.backgroundColor}
        colorButton={room.colorButton}
        onClick={this.props.onClick}
        status={room.presence}
        key={room.roomId}
        roomId={room.roomId}
        presence={room.presence}
      />
    ));
    return (
      <div styles={{ marginLeft: 200 }}>
        <GridList styles={{ marginLeft: 200 }} className="roomList">
          {rooms}
        </GridList>
      </div>
    );
  }
}

export default RoomList;
