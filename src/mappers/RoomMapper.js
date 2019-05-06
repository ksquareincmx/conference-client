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

export const toRoomColors = room => {
  const { bg_color, txt_color } = room;
  return { bgColor: bg_color, txtColor: txt_color };
};
