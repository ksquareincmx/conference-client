import { apiGateway } from "gateways";
import * as bookingMapper from "mappers/BookingMapper";
import { IBooking } from "models/Booking";

export interface IBookingService {
  createOne: (booking: IBooking) => Promise<IBooking | Error>;
  getOneById: (id: string) => Promise<IBooking | Error>;
  getAll: () => Promise<IBooking[] | Error>;
  getAllWithDetails: (filterDate: any) => Promise<any | Error>;
  getAllWithDetailsByRoom: (
    filterDate: any,
    roomId: any,
  ) => Promise<any | Error>;
  updateOneById: (id: any, booking: any) => Promise<IBooking | Error>;
  deleteOneById: (id: any) => Promise<any | Error>;
}

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
 * @property {number} roomId - room id.
 * @property {number} userId - user id who created the booking.
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
export const BookingService = (storageService: any): IBookingService => {
  /**
   * Return the new Booking information.
   * @memberof BookingService
   * @param {BookingRequest} booking - booking information.
   * @return {BookingResponse} - created booking information.
   */
  const createOne = async (booking: IBooking): Promise<IBooking | Error> => {
    try {
      const { token } = storageService.getJWT();
      const { id } = storageService.getUserInfo();
      const data = bookingMapper.fromEntityToDto({
        ...booking,
        userId: id,
      });

      const res = await apiGateway.doPost("createBooking", {
        data,
        authToken: token,
      });

      return (await res.json()) as IBooking;
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
  const getOneById = async (id: string): Promise<IBooking | Error> => {
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
  const getAll = async (): Promise<IBooking[] | Error> => {
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
  const getAllWithDetails = async (filterDate: any): Promise<any | Error> => {
    const { token: authToken } = storageService.getJWT();
    const config = { filterDate, authToken, include: "user" };
    try {
      const res = await apiGateway.doGet("getDetailedBookings", config);
      // Unauthorized
      if (res.status === 401) {
        return Promise.reject(res);
      }

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
  const getAllWithDetailsByRoom = async (
    filterDate: any,
    roomId: any,
  ): Promise<any | Error> => {
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
  const updateOneById = async (
    id: any,
    booking: any,
  ): Promise<IBooking | Error> => {
    const { token: authToken } = storageService.getJWT();
    const updateBody = bookingMapper.fromEntityToDto(booking);
    const { userId } = booking;
    const config = {
      id,
      updateBody: {
        ...updateBody,
        userId,
      },
      authToken,
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
  const deleteOneById = async (id: any): Promise<any | Error> => {
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
    deleteOneById,
  };
};
