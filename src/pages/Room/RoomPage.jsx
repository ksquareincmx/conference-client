import React from "react";
import { CalendarContainer } from "./CalendarContainer";

export const RoomPage = props => {
  const { roomId } = props.match.params;
  return <CalendarContainer URLRoomId={roomId} />;
};
