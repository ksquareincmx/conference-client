import React from "react";
import RoomService from "services/RoomService";
import baseUri from "../../config/baseUri";

const RoomContext = React.createContext({
  createNewRoom: () => {},
  getRoom: () => {},
  getListOfRoom: () => {},
  modifyRoom: () => {},
  removeRoom: () => {}
});

export const RoomConsumer = RoomContext.Consumer;
export class RoomProvider extends React.Component {
  roomService = RoomService(baseUri + "Room/", this.props.auth.jwt.token);
  createNewRoom = room => {
    return this.roomService.createOne(room);
  };

  getRoom = id => {
    return this.roomService.getOne(id);
  };

  getsListOfRoom = () => {
    return this.roomService.getAll();
  };

  modifyRoom = (room, id) => {
    return this.roomService.updateOne(room, id);
  };

  removeRoom = id => {
    return this.roomService.deleteOne(id);
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          createNewRoom: this.createNewRoom,
          getRoom: this.getRoom,
          getListOfRoom: this.getsListOfRoom,
          modifyRoom: this.modifRoom,
          removeRoom: this.removeRoom
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}
