/**
 * @typedef {Object} BookingRequest
 * @property {string} description - booking description.
 * @property {number} roomId - booking room id.
 * @property {Date} start - start date.
 * @property {Date} end - end date.
 * @property {string[]} attendees - booking attendee.
 */

/**
 * @typedef {Object} BookingResponse
 * @property {number} id - booking description.
 * @property {string} description - booking room id.
 * @property {Date} start - booking start date.
 * @property {Date} end - booking end date.
 * @property {string} event_id -Google calendar event id .
 * @property {number} room_id - room id.
 * @property {number} user_id - user id who created the booking.
 * @property {Date} created_at - booking creation date.
 * @property {Date} updated_at - booking update date.
 * @property {string[]} attendees - Emails from users who will attend the event.
 */

/**
 * @typedef {object} Response
 * @property {string} type - type response cors.
 * @property {string} url - request url.
 * @property {boolean} redirected - redirection of the request.
 * @property {number} status - status code of the request.
 * @property {boolean} ok - errors on the request.
 */

/**
 * @typedef {Object} Room
 * @property {number} id - Room id.
 * @property {string} name - Room name.
 * @property {string} color - Room color.
 * @property {boolean} presence - Room presence (for future sensor integration).
 * @property {Date} created_at - Room creation date.
 * @property {Date} update_at - Room update date.
 * @property {number} booking_id_actual - Booking id that currently occupies the room, null if its not.
 * @property {string} status - Booking status ("Available" or "Not Available").
 */

/**
 * @typedef {Object} User
 * @property {number} id - user id.
 * @property {number} authProviderId - user auth provider id (for the moment only Google).
 * @property {string} picture - user picture URL.
 * @property {string} name - user name.
 * @property {string} email - user email.
 */

/**
 * @typedef {Object} BookingWithDetails
 * @property {BookingResponse} - Booking information
 * @property {User} - User information.
 * @property {Room} - Room information.
 */

/**
 * @version 1.0
 * @exports BookingService
 * @namespace BookingService
 * @property {string} bookingUri - booking uri
 * @property {string} token - user token
 */
const BookingService = (bookingUri, token) => {
  /**
   * Return the new Booking information thats created.
   * @memberof BookingService
   * @param {BookingRequest} booking - booking information.
   * @return {BookingResponse} - booking created information.
   */

  const createOne = booking => {
    console.log("BOOK: ", booking);
    return fetch(bookingUri, {
      method: "POST",
      body: JSON.stringify({
        description: booking.description,
        room_id: booking.roomId,
        start: booking.start,
        end: booking.end,
        attendees: booking.attendees
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .catch(err => {
        return new Error("An error occurred whith the request");
      });
  };

  /**
   *  Return a booking finded by id
   *  @memberof BookingService
   *  @param {number} id - booking id.
   *  @return {BookingResponse} - booking finded information
   */
  const getOne = id => {
    return fetch(bookingUri + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .catch(err => {
        return new Error("An error occurred whith the request");
      });
  };

  /**
   *  Return all Booking
   *  @memberof BookingService
   *  @return {BookingResponse[]} - bookings finded information
   */
  const getAll = () => {
    return fetch(bookingUri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .catch(err => {
        return new Error("An error occurred whith the request");
      });
  };

  /**
   * Return all the bookings with his details (Room and User information)
   * @memberof BookingService
   * @return {BookingWithDetails}
   */
  const getAllWithDetails = () => {
    const NewbookingUri = bookingUri + '?include=["Room","User"]';
    return fetch(NewbookingUri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .catch(err => {
        throw err;
      });
  };

  /**
   *  Returns a booking updated by id
   *  @memberof BookingService
   *  @param {BookingRequest} booking - booking information.
   *  @param {number} id - booking id.
   *  @return {BookingResponse} - booking updated information
   */
  const updateOne = (booking, id) => {
    return fetch(bookingUri + id, {
      method: "PUT",
      body: JSON.stringify({
        description: booking.description,
        room_id: booking.roomId,
        start: booking.start,
        end: booking.end,
        attendees: booking.attendees
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .catch(err => {
        throw new Error("An error occurred whith the request");
      });
  };

  /**
   *  Delete a booking by id
   *  @memberof BookingService
   *  @param {number} id - booking id.
   * @returns {Response}
   */

  const deleteOne = id => {
    return fetch(bookingUri + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => res)
      .catch(err => {
        throw err;
      });
  };

  return {
    createOne,
    getOne,
    getAll,
    getAllWithDetails,
    updateOne,
    deleteOne
  };
};

export default BookingService;
