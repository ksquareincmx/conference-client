export const toRoomsWithColor = rooms => {
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
