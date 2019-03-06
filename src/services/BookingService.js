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

// TODO: Review the use of this typoe definition
/**
 * @typedef {object} NotContentResponse
 * @property {string} type - type response cors.
 * @property {string} url - request url.
 * @property {boolean} redirected - redirection of the request.
 * @property {number} status - status code of the request.
 * @property {boolean} ok - errors on the request.
 */

/**
 * @typedef {Object} Room
 * @property {number} id - room id.
 * @property {string} name - room name.
 * @property {string} color - room color.
 * @property {boolean} presence - room presence (for future sensor integration).
 * @property {Date} created_at - room creation date.
 * @property {Date} update_at - room update date.
 * @property {number} booking_id_actual - booking id that currently occupies the room, null if its not.
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
 * @property {BookingResponse[]} - booking information.
 * @property {User} - user information.
 * @property {Room} - room information.
 */

/**
 * @version 1.0
 * @exports BookingService
 * @namespace BookingService
 */
export const BookingService = () => {
  /**
   * Return URL for consuming the Booking API.
   * @memberof BookingService
   * @return {string} - Base URL for all related Bookings requests.
   */
  const getBookingApiURL = () => `${process.env.REACT_APP_SERVER_URI}Booking/`;

  /**
   * Return the new Booking information.
   * @memberof BookingService
   * @param {BookingRequest} booking - booking information.
   * @param {string} authToken - authorization token.
   * @return {BookingResponse} - created booking information.
   */
  const createOne = (
    { description, roomId, start, end, attendees },
    authToken
  ) => {
    const baseURL = getBookingApiURL();
    return fetch(baseURL, {
      method: "POST",
      body: JSON.stringify({
        description,
        start,
        end,
        attendees,
        room_id: roomId
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer${authToken}`
      }
    })
      .then(res => res.json())
      .catch(err => new Error("An error occurred whith the request"));
  };

  /**
   * Return the found booking information using the id.
   * @memberof BookingService
   * @param {number} id - booking id.
   * @param {string} authToken - authorization token.
   * @return {BookingResponse} - found booking information.
   */
  const getOne = (id, authToken) => {
    const baseURL = getBookingApiURL();
    const url = `${baseURL}${id}`;
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer${authToken}`
      }
    })
      .then(res => res.json())
      .catch(err => new Error("An error occurred whith the request"));
  };

  /**
   * Return all Bookings information.
   * @memberof BookingService
   * @param {string} authToken - authorization token.
   * @return {BookingResponse[]} - found bookings information.
   */
  const getAll = authToken => {
    const baseURL = getBookingApiURL();
    return fetch(baseURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer${authToken}`
      }
    })
      .then(res => res.json())
      .catch(err => new Error("An error occurred whith the request"));
  };

  /**
   * Return all the bookings with all their details (Room and User information).
   * @memberof BookingService
   * @param {string} authToken - authorization token.
   * @return {BookingWithDetails} - found bookigs and, room and user information.
   */
  const getAllWithDetails = authToken => {
    const baseURL = getBookingApiURL();
    const url = `${baseURL}?include=["Room","User"]`;
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer${authToken}`
      }
    })
      .then(res => res.json())
      .catch(err => new Error("An error occurred whith the request"));
  };

  /**
   * Update the booking information and return it.
   * @memberof BookingService
   * @param {BookingRequest} booking - booking new information.
   * @param {number} id - booking id.
   * @param {string} authToken - authorization token.
   * @return {BookingResponse} - booking updated information.
   */
  // TODO: Change id param as the first one in the function signature
  const updateOne = (booking, id, authToken) => {
    const baseURL = getBookingApiURL();
    const url = `${baseURL}${id}`;
    const { description, roomId, start, end, attendees } = booking;
    return fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        description,
        roomId,
        start,
        end,
        attendees
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer${authToken}`
      }
    })
      .then(res => res.json())
      .catch(err => new Error("An error occurred whith the request"));
  };

  /**
   * Delete a booking by id.
   * @memberof BookingService
   * @param {number} id - booking id.
   * @param {string} authToken - authorization token.
   * @returns {NotContentResponse} - request response.
   */
  const deleteOne = (id, authToken) => {
    const baseURL = getBookingApiURL();
    const url = `${baseURL}${id}`;
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer${authToken}`
      }
    })
      .then(res => res)
      .catch(err => new Error("An error occurred whith the request"));
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
