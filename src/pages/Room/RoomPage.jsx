import React from "react";
import { CalendarContainer } from "./CalendarContainer";

export const RoomPage = props => {
  // TODO: roomId should be updated automatically, no need to reload window CalendarPageLogic
  const { roomId } = props.match.params;
  return <CalendarContainer URLRoomId={roomId} />;
};
