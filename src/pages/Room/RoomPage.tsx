import React from "react";
import { CalendarContainer } from "./CalendarContainer";

export interface IRoomPage {
  match: {
    params: {
      roomId: String;
    }
  }
};


export const RoomPage:React.SFC<IRoomPage> = ({ match }) => {
  // TODO: roomId should be updated automatically, no need to reload window CalendarPageLogic
  const { roomId } = match.params;
  return <CalendarContainer URLRoomId={roomId} />;
};
