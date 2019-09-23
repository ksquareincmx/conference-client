import moment from "moment";

const parseDate = date => moment(date).local();

export const isColliding = (newSelection, selectionsList) => {
  const { roomId: newRoomId, start, end } = newSelection;
  const newStart = moment(start).unix();
  const newEnd = moment(end).unix();

  return selectionsList.some(selection => {
    const { room, start: selecStart, end: selecEnd } = selection;
    const { id: currentRoomId } = room;
    if (newRoomId === currentRoomId) {
      const currentStart = parseDate(selecStart).unix();
      const currentEnd = parseDate(selecEnd).unix();
      // Collision at the end
      if (
        newStart < currentStart &&
        newEnd < currentEnd &&
        newEnd > currentStart
      ) {
        return true;
      }
      // Collision at the start
      if (
        newStart > currentStart &&
        newEnd > currentEnd &&
        newStart < currentEnd
      ) {
        return true;
      }
      // Collision being the same start and end
      if (newStart === currentStart && newEnd === currentEnd) {
        return true;
      }
      // Collision between the old selection
      if (newStart >= currentStart && newEnd <= currentEnd) {
        return true;
      }
      // Collision covering de old one insede de new one
      if (newStart < currentStart && newEnd > currentEnd) {
        return true;
      }
      // No collision
      return false;
    }

    return false;
  });
};
