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

const room = (): IRoom => ({
  bgColor: "",
  guests: 1,
  id: 1,
  minimumCapacity: 1,
  name: "",
  presence: false,
  txtColor: "",
});

export const fromEntityToDto = (
  {
    bgColor = "",
    guests = 1,
    id = 1,
    minimumCapacity = 1,
    name = "",
    presence = false,
    txtColor = "",
  }: IRoom = room(),
): IRoomDto => ({
  bg_color: bgColor,
  guests: guests,
  id: id,
  minimum_capacity: minimumCapacity,
  name: name,
  presence: presence,
  txt_color: txtColor,
});
