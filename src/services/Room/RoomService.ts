import { apiGateway } from "gateways";
import { IRoom } from "models/Room";
import { IRoomDto } from "dtos/RoomDto";
import * as roomMapper from "mappers/RoomMapper";
import * as bookingMapper from "mappers/BookingMapper";
import { IBookingDto } from "dtos/BookingDto";
import { IBooking } from "models/Booking";

export interface IRoomService {
  createOne: ({ name, color }: any) => Promise<any | Error>;
  getOneById: (id: string | number) => Promise<any | Error>;
  getAll: () => Promise<any | Error>;
  updateOneById: (
    id: string | number,
    { name, color }: any,
  ) => Promise<any | Error>;
  deleteOneById: (id: string | number) => Promise<any | Error>;
}

/**
 * @typedef {Object} Room
 * @property {string} name - room name.
 * @property {string} color - room color.
 */

/**
 * @typedef {Object} RoomResponse
 * @property {number} id - room id.
 * @property {string} name - room name.
 * @property {string} color - room color.
 * @property {boolean} presence - room presence (for future sensor integration).
 * @property {Date} created_at - room creation date.
 * @property {Date} update_at - room update date.
 * @property {number} booking_id_actual - Booking id that currently occupies the room, null if its not.
 * @property {string} status - room status ("Available" or "Not Available").
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
 * @version 1.0
 * @exports RoomService
 * @namespace RoomService
 * @param storageService - service used for access to session info
 */
export const RoomService = (storageService: any): IRoomService => {
  /**
   * Create a new room and return it.
   * @memberof RoomService
   * @param {Room} room - room object.
   * @returns {RoomResponse} - created room information.
   */
  const createOne = async ({ name, color }: any): Promise<any | Error> => {
    const { token: authToken } = storageService.getJWT();
    const config = {
      data: { name, color },
      authToken,
    };
    try {
      const res = await apiGateway.doPost("createRoom", config);
      return await res.json();
    } catch (error) {
      return new Error(error.message);
    }
  };

  /**
   * Return the found Room information using the id.
   * @memberof RoomService
   * @param {number} id - room id.
   * @returns {RoomResponse} - found room information.
   */
  const getOneById = async (
    id: string | number,
  ): Promise<IBooking[] | Error> => {
    const { token: authToken } = storageService.getJWT();
    const config = { id, authToken };
    try {
      const res = await apiGateway.doGet("getRoomById", config);
      const bookingList = (await res.json()) as IBookingDto[];
      return bookingList.map(bookingMapper.fromDtoToEntity);
    } catch (error) {
      return new Error(error.message);
    }
  };

  /**
   * Return all Rooms information.
   * @memberof RoomService
   * @returns {RoomResponse[]} - found rooms information.
   */
  const getAll = async (): Promise<IRoom[] | Error> => {
    try {
      const { token: authToken } = storageService.getJWT();
      const config = { authToken };
      const res = await apiGateway.doGet("getAllRooms", config);
      const rooms = (await res.json()) as IRoomDto[];
      return rooms.map(roomMapper.fromDtoToEntity);
    } catch (error) {
      return new Error(error.message);
    }
  };

  /**
   * Update the room information and return it.
   * @memberof RoomService
   * @param {number} id - room id.
   * @param {Room} room - room object.
   * @returns {RoomResponse} - room updated information.
   */
  const updateOneById = async (
    id: string | number,
    { name, color }: any,
  ): Promise<any | Error> => {
    const { token: authToken } = storageService.getJWT();
    const config = {
      id,
      updateBody: {
        name,
        color,
      },
      authToken,
    };
    try {
      const res = await apiGateway.doUpdate("updateRoomById", config);
      return await res.json();
    } catch (error) {
      return new Error(error.message);
    }
  };

  /**
   * Delete a room by id.
   * @memberof RoomService
   * @param {number} id - room id.
   *  @returns {NotContentResponse} - request response.
   */
  const deleteOneById = async (id: string | number): Promise<any | Error> => {
    const { token: authToken } = storageService.getJWT();
    const config = { id, authToken };
    try {
      const res = await apiGateway.doDelete("deleteRoomById", config);
      return await res;
    } catch (error) {
      return new Error(error.message);
    }
  };

  return {
    createOne,
    getOneById,
    getAll,
    updateOneById,
    deleteOneById,
  };
};
