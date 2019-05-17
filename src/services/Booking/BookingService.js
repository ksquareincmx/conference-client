import { apiGateway } from "gateways";
import { mapToRequestFormat } from "mappers/bookingMapper";

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

// TODO: Review the use of this type definition
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
 * @typedef {Object} BookingWithDetailsByRoom
 * @property {BookingResponse[]} - booking information.
 * @property {User} - user information.
 * @property {Room} - room information.
 */

/**
 * @version 1.0
 * @exports BookingService
 * @namespace BookingService
 * @param storageService - service used for access to session info
 */
export const BookingService = storageService => {
  /**
   * Return the new Booking information.
   * @memberof BookingService
   * @param {BookingRequest} booking - booking information.
   * @return {BookingResponse} - created booking information.
   */
  const createOne = async booking => {
    const { token: authToken } = storageService.getJWT();
    const createBody = mapToRequestFormat(booking);
    const config = {
      createBody,
      authToken
    };
    try {
      const res = await apiGateway.doPost("createBooking", config);
      return await res.json();
    } catch (error) {
      return new Error(error.message);
    }
  };

  /**
   * Return the found booking information using the id.
   * @memberof BookingService
   * @param {number} id - booking id.
   * @return {BookingResponse} - found booking information.
   */
  const getOneById = async id => {
    const { token: authToken } = storageService.getJWT();
    const config = { id, authToken };
    try {
      const res = await apiGateway.doGet("getBookingById", config);
      return await res.json();
    } catch (error) {
      return new Error(error.message);
    }
  };

  /**
   * Return all Bookings information.
   * @memberof BookingService
   * @return {BookingResponse[]} - found bookings information.
   */
  const getAll = async () => {
    const { token: authToken } = storageService.getJWT();
    const config = { authToken };
    try {
      const res = await apiGateway.doGet("getAllBookings", config);
      return await res.json();
    } catch (error) {
      return new Error(error.message);
    }
  };

  /**
   * Return all the bookings with all their details (Room and User information).
   * @memberof BookingService
   * @return {BookingWithDetails} - found bookigs and, room and user information.
   */
  const getAllWithDetails = async filterDate => {
    const { token: authToken } = storageService.getJWT();
    const config = { filterDate, authToken };
    try {
      const res = await apiGateway.doGet("getDetailedBookings", config);
      return await res.json();
    } catch (error) {
      return new Error(error.message);
    }
  };

  /**
   * Return all the bookings of one room with all their details (Room and User information).
   * @memberof BookingService
   * @return {BookingWithDetailsByRoom} - found bookigs and, room and user information.
   */
  const getAllWithDetailsByRoom = async (filterDate, roomId) => {
    const { token: authToken } = storageService.getJWT();
    const config = { filterDate, roomId, authToken };
    try {
      const res = await apiGateway.doGet("getDetailedBookingsByRoom", config);
      return await res.json();
    } catch (error) {
      return new Error(error.message);
    }
  };

  /**
   * Update the booking information and return it.
   * @memberof BookingService
   * @param {number} id - booking id.
   * @param {BookingRequest} booking - booking new information.
   * @return {BookingResponse} - booking updated information.
   */
  const updateOneById = async (id, booking) => {
    const { token: authToken } = storageService.getJWT();
    const updateBody = mapToRequestFormat(booking);
    const config = {
      id,
      updateBody,
      authToken
    };
    try {
      const res = await apiGateway.doUpdate("updateBookingById", config);
      return await res.json();
    } catch (error) {
      return new Error(error.message);
    }
  };

  /**
   * Delete a booking by id.
   * @memberof BookingService
   * @param {number} id - booking id.
   * @returns {NotContentResponse} - request response.
   */
  const deleteOneById = async id => {
    const { token: authToken } = storageService.getJWT();
    const config = { id, authToken };
    try {
      const res = await apiGateway.doDelete("deleteBookingById", config);
      return await res;
    } catch (error) {
      return new Error(error.message);
    }
  };

  return {
    createOne,
    getOneById,
    getAll,
    getAllWithDetails,
    getAllWithDetailsByRoom,
    updateOneById,
    deleteOneById
  };
};
