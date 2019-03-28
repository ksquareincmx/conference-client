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

export const getEventColors = eventColor => {
  switch (eventColor) {
    case "green":
      return {
        backgroundColor: "#8fdb32",
        borderColor: "#599319",
        textColor: "#053000"
      };
    case "blue":
      return {
        backgroundColor: "#7bd1bd",
        borderColor: "#3BA18B",
        textColor: "#00543f"
      };
    default:
      break;
  }
};
