import * as Utils from "pages/Calendar/Utils";
import { formatDate } from "utils/BookingFormater";

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

export const formatEvents = bookings => {
  return bookings.map(booking => {
    return {
      start: formatDate(booking.start).toDate(),
      end: formatDate(booking.end).toDate(),
      title: booking.user.name,
      userId: booking.user.id,
      roomId: booking.room.id,
      roomName: booking.room.name,
      color: booking.room.color,
      bookingId: booking.id,
      desc: booking.description,
      booking
    };
  });
};

export const mapEventsByRoom = (bookings, rooms) => {
  const events = formatEvents(bookings);
  const roomsIdsList = rooms.map(room => room.id);
  const eventsByRoom = roomsIdsList.map(id => ({
    roomId: id,
    roomEvents: events.filter(event => event.roomId === id)
  }));

  return eventsByRoom;
};
