import * as Utils from "pages/Calendar/Utils";

export const toDto = state => {
  const dateFormat =
    Utils.addZeros(state.date.year) +
    "-" +
    Utils.addZeros(state.date.month) +
    "-" +
    Utils.addZeros(state.date.day);
  return {
    description: state.reasonAppointment,
    roomId: state.roomId,
    start:
      dateFormat +
      "T" +
      Utils.addZeros(state.start.hours) +
      ":" +
      Utils.addZeros(state.start.minutes) +
      ":" +
      "00.000Z",
    end:
      dateFormat +
      "T" +
      Utils.addZeros(state.end.hours) +
      ":" +
      Utils.addZeros(state.end.minutes) +
      ":" +
      "00.000Z",
    attendees: []
  };
};

export const toEvents = bookings => {
  return bookings.reduce(
    (accumulator, booking) => {
      const start = Utils.getDateFormat(booking.start);
      const end = Utils.getDateFormat(booking.end);
      const title = booking.description;
      const roomId = booking.room_id - 1;

      accumulator[roomId].push({
        start,
        end,
        title,
        roomId
      });
      return accumulator;
    },
    [[], []]
  );
};
