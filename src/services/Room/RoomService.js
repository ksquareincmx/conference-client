import { apiGateway } from "gateways";

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
 * @property {number} minimum_capacity - room capacity (default: 1, less will throw an error)
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
export const RoomService = storageService => {
  /**
   * Create a new room and return it.
   * @memberof RoomService
   * @param {Room} room - room object.
   * @returns {RoomResponse} - created room information.
   */
  const createOne = async ({ name, color }) => {
    const { token: authToken } = storageService.getJWT();
    const config = {
      createBody: { name, color },
      authToken
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
  const getOneById = async id => {
    const { token: authToken } = storageService.getJWT();
    const config = { id, authToken };
    try {
      const res = await apiGateway.doGet("getRoomById", config);
      return await res.json();
    } catch (error) {
      return new Error(error.message);
    }
  };

  /**
   * Return all Rooms information.
   * @memberof RoomService
   * @returns {RoomResponse[]} - found rooms information.
   */
  const getAll = async () => {
    const { token: authToken } = storageService.getJWT();
    const config = { authToken };
    try {
      const res = await apiGateway.doGet("getAllRooms", config);
      return await res.json();
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
  const updateOneById = async (id, { name, color }) => {
    const { token: authToken } = storageService.getJWT();
    const config = {
      id,
      updateBody: {
        name,
        color
      },
      authToken
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
  const deleteOneById = async id => {
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
    deleteOneById
  };
};
