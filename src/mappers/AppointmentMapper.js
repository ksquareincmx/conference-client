import { formatDate } from "utils/BookingFormater";

export const mapToPost = postInfo => {
  return {
    description: postInfo.reasonAppointmentText,
    roomId: postInfo.roomId,
    start: formatDate(
      postInfo.date +
        "T" +
        postInfo.startTime.hour +
        ":" +
        postInfo.startTime.minute
    ).toDate(),
    end: formatDate(
      postInfo.date +
        "T" +
        postInfo.endTime.hour +
        ":" +
        postInfo.endTime.minute
    ).toDate(),
    attendees: [...postInfo.attendees]
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
