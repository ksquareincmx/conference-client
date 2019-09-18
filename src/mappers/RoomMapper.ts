import { IRoomDto } from "dtos/RoomDto";
import { IRoom } from "models/Room";

export const toRoomsWithColor = (rooms: any[]) => {
  return rooms.map(room => {
    if (room.color === "green") {
      room.backgroundColor = "#D8F0BE";
      room.colorButton = "#4A90E2";
    } else {
      room.backgroundColor = "#CAF7ED";
      room.colorButton = "#92B3AC";
    }
    room.roomId = room.id;
    return room;
  });
};

export const toRoomColors = (room: any) => {
  const { bg_color, txt_color } = room;
  return { bgColor: bg_color, txtColor: txt_color };
};

export const fromDtoToEntity = (roomDto: IRoomDto): IRoom => ({
  bgColor: roomDto.bg_color,
  guests: roomDto.guests,
  id: roomDto.id,
  minimumCapacity: roomDto.minimum_capacity,
  name: roomDto.name,
  presence: roomDto.presence,
  txtColor: roomDto.txt_color,
});
