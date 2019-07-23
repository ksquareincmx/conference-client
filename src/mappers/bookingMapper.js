import { getDateText, formatDate, formatTime, abbreviateRoomName } from "utils/BookingFormater";

/**
 * @typedef {Object} User
 * @property {number} id - user id.
 * @property {string} name - user name.
 * @property {string} email - user email.
 * @property {string} picture - user picture url.
 * @property {number} auth_provider_id - authorization id.
 *
 */

/**
 * @typedef {Object} Room
 * @property {number} id - room id.
 * @property {string} name - room name.
 * @property {string} color - room color.
 * @property {date} cretaed_at - room creation date.
 * @property {date} updated_at - room last modification date.
 * @property {bool} presence - people presence indicator.
 */

/**
 * @typedef {Object} BookingRequest
 * @property {string} description - booking description.
 * @property {number} roomId - booking room id.
 * @property {Date} start - start date.
 * @property {Date} end - end date.
 * @property {string[]} attendees - booking attendees.
 */

/**
 * @typedef {Object} BookingRequestWithFormat
 * @property {string} description - booking description.
 * @property {number} room_id - booking room id.
 * @property {Date} start - start date.
 * @property {Date} end - end date.
 * @property {string[]} attendees - booking attendees.
 */

/**
 * @typedef {Object} BookingResponse
 * @property {number} id - booking description.
 * @property {string} description - booking room id.
 * @property {Date} start - booking start date.
 * @property {Date} end - booking end date.
 * @property {string} event_id -Google calendar event id.
 * @property {number} room_id - room id.
 * @property {number} user_id - user id who created the booking.
 * @property {Date} created_at - booking creation date.
 * @property {Date} updated_at - booking update date.
 * @property {string[]} attendees - Emails from users who will attend the event.
 * @property {User} user - booking owner info.
 * @property {Room} room - booking room info.
 */

/**
 * @typedef {Object} BookingForNotification
 * @param {string} userName - user name.
 * @param {string} abbvRoomName - abbreviate room name.
 * @param {string} color - room color
 */

/**
 * @typedef {Object} BookingForDialog
 * @param {string} roomName - user name.
 * @param {date} startDate - booking start date
 * @param {date} endDate - booking end date
 * @param {string} dateText - date in text format
 */

/**
 * Return booking info with required format for request
 * @param {BookingRequest} booking - booking info
 * @returns {BookingRequestWithFormat} - booking info with required format
 */
export const mapToRequestFormat = ({ start, end, description, room_id, attendees }) => ({
  start,
  end,
  description,
  room_id,
  attendees
});

/**
 * Return booking info with required format for showing in list
 * @param {BookingResponse} booking
 * @returns {PendingToDefine} - booking info with required format
 */
/* TODO: Check this, the function returns unnecesary properties
with the ...booking */
export const mapToListFormat = booking => {
  const { id: bookingId, start, user, room, attendees, end } = booking;
  const { id: userId, name: userName } = user;
  const { name: roomName, bg_color: roomColor } = room;
  const roomNameAbbrev = abbreviateRoomName(roomName);
  const dateText = getDateText(formatDate(start));
  return {
    ...booking,
    start,
    end,
    bookingId,
    userId,
    userName,
    roomName,
    roomNameAbbrev,
    roomColor,
    dateText,
    attendees
  };
};

/**
 * Return booking info with required format for show in notification
 * @param {PendingToDefine} booking // The same that returns the map2List
 * @param {string} notificationType - notification type
 * @returns {BookingForNotification} - booking info with required format
 */
export const mapToNotificationContentFormat = ({ user, room }) => {
  const { name: userName } = user;
  const { name: roomName } = room;
  return {
    userName,
    roomName
  };
};

/**
 * Return booking info with required format for show in confirmation dialog
 * @param {PendingToDefine} booking // The same that returns the map2List
 * @return {BookingForDialog} - booking info with required format
 */
export const mapToConfirmationDialogFormat = ({ start, end, roomName, dateText }) => {
  const startTime = formatTime(formatDate(start));
  const endTime = formatTime(formatDate(end));
  return {
    roomName,
    startTime,
    endTime,
    dateText
  };
};
