import * as Utils from "pages/Calendar/Utils";
import uniq from "lodash/fp/uniq";

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

const countRoomsWithEvents = events => uniq(events.map(event => event.roomId));

export const toEvents = bookings => {
  const events = bookings.map(booking => {
    return {
      start: Utils.getDateFormat(booking.start),
      end: Utils.getDateFormat(booking.end),
      title: booking.description,
      roomId: booking.room_id
    };
  });

  const roomsIdsList = countRoomsWithEvents(events);
  const eventsByRoom = roomsIdsList.map(id =>
    events.filter(event => event.roomId === id)
  );

  return eventsByRoom;
};
