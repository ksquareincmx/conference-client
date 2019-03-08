import React from "react";
import { roomService } from "services";
import { withAuthContext } from "../../hocs/Auth";

const RoomContext = React.createContext({
  createNewRoom: () => {},
  getRoom: () => {},
  getListOfRoom: () => {},
  modifyRoom: () => {},
  removeRoom: () => {}
});

class RoomProvider extends React.Component {
  createNewRoom = room => {
    const { token: authToken } = this.props.auth.jwt;
    return roomService.createOne(room, authToken);
  };

  getRoom = id => {
    const { token: authToken } = this.props.auth.jwt;
    return roomService.getOne(id, authToken);
  };

  getsListOfRoom = () => {
    const { token: authToken } = this.props.auth.jwt;
    return roomService.getAll(authToken);
  };

  modifyRoom = (room, id) => {
    const { token: authToken } = this.props.auth.jwt;
    return roomService.updateOne(room, id, authToken);
  };

  removeRoom = id => {
    const { token: authToken } = this.props.auth.jwt;
    return roomService.deleteOne(id, authToken);
  };

  render() {
    const { children } = this.props;
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
        {children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;
export { RoomProvider, RoomConsumer };
