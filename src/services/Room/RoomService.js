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

/**
 * @version 1.0
 * @exports RoomService
 * @namespace RoomService
 * @param storageService - service used for access to session info
 */
export const RoomService = storageService => {
  /**
   * Room service require the auth token for requests
   */
  const { token: authToken } = storageService.getJWT();

  /**
   * Return URL for consuming the Room API.
   * @memberof RoomService
   * @return {string} - Base URL for all related Rooms requests.
   */
  const getRoomApiURL = () => `${process.env.REACT_APP_SERVER_URI}Room/`;
  /**
   * Create a new room and return it.
   * @memberof RoomService
   * @param {Room} room - room object.
   * @returns {RoomResponse} - created room information.
   */
  const createOne = async room => {
    const baseURL = getRoomApiURL();
    const { name, color } = room;
    try {
      const res = await fetch(baseURL, {
        method: "POST",
        body: {
          name,
          color
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      });
      return await res.json();
    } catch (error) {
      return new Error("An error occurred whith the request");
    }
  };

  /**
   * Return the found Room information using the id.
   * @memberof RoomService
   * @param {number} id - room id.
   * @returns {RoomResponse} - found room information.
   */
  const getOne = async id => {
    const baseURL = getRoomApiURL();
    const url = `${baseURL}${id}`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      });
      return await res.json();
    } catch (error) {
      return new Error("An error occurred whith the request");
    }
  };

  /**
   * Return all Rooms information.
   * @memberof RoomService
   * @returns {RoomResponse[]} - found rooms information.
   */
  const getAll = async () => {
    const baseURL = getRoomApiURL();
    try {
      const res = await fetch(baseURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      });
      return await res.json();
    } catch (error) {
      return new Error("An error occurred whith the request");
    }
  };

  /**
   * Update the room information and return it.
   * @memberof RoomService
   * @param {Room} room - room object.
   * @param {number} id - room id.
   * @returns {RoomResponse} - room updated information.
   */
  const updateOne = async (id, { name, color }) => {
    const baseURL = getRoomApiURL();
    const url = `${baseURL}${id}`;
    try {
      const res = await fetch(url, {
        method: "PUT",
        body: {
          name,
          color
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      });
      return await res.json();
    } catch (error) {
      return new Error("An error occurred whith the request");
    }
  };

  /**
   * Delete a room by id.
   * @memberof RoomService
   * @param {number} id - room id.
   */
  //  TODO: @returns {NotContentResponse} - request response.
  const deleteOne = async id => {
    const baseURL = getRoomApiURL();
    const url = `${baseURL}${id}`;
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      });
      return await res.json();
    } catch (error) {
      return new Error("An error occurred whith the request");
    }
  };

  return {
    createOne,
    getOne,
    getAll,
    updateOne,
    deleteOne
  };
};
