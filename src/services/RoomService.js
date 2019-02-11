/**
 * RoomResponse object
 * @typedef {Object} RoomResponse
 * @property {number} id - Room id
 * @property {string} name - Room name
 * @property {string} color - Room color
 * @property {boolean} presence - Room presence (for future sensor integration)
 * @property {Date} created_at - Room creation date
 * @property {Date} update_at - Room update date
 * @property {number} booking_id_actual - Booking id that currently occupies the room, null if its not
 * @property {string} status - Room status ("Available" or "Not Available")
 */

/**
 * Room object
 * @typedef {Object} Room
 * @property {string} name - room name
 * @property {string} color - room color
 */

/**
 * @version 1.0
 * @exports RoomService
 * @namespace RoomService
 * @property {string} roomUri - room uri
 * @property {string} token - user token
 */
const RoomService = (roomUri, token) => {
  /**
   * Create a room and return it
   * @memberof RoomService
   * @param {Room} room - Room object
   * @returns {RoomResponse}
   */
  const createOne = room => {
    return fetch(roomUri, {
      method: "POST",
      body: {
        name: room.name,
        color: room.color
      },
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
   * Return a Room finded by id
   * @memberof RoomService
   * @param {number} id - room id
   * @returns {RoomResponse}
   */
  const getOne = id => {
    return fetch(roomUri + id, {
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
   * Return all Rooms
   * @memberof RoomService
   * @returns {RoomResponse[]}
   */
  const getAll = () => {
    return fetch(roomUri, {
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
   * Update a room and return it
   * @memberof RoomService
   * @param {Room} room - Room object
   * @param {number} id - room id
   * @returns {RoomResponse}
   */
  const updateOne = (room, id) => {
    return fetch(roomUri + id, {
      method: "PUT",
      body: {
        name: room.name,
        color: room.color
      },
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
   * Delete a room by id
   * @memberof RoomService
   * @param {number} id - room id
   */
  const deleteOne = id => {
    return fetch(roomUri + id, {
      method: "DELETE",
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

  return {
    createOne,
    getOne,
    getAll,
    updateOne,
    deleteOne
  };
};

export default RoomService;
