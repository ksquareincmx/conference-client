/**
 * @typedef {Object} ProfileRequest
 * @property {string} time_zone
 * @property {string} locale
 */

/**
 * @version 1.0
 * @exports ProfileService
 * @namespace ProfileService
 * @property {string} profileUri - profile uri
 * @property {string} token - user token
 */
const ProfileService = (profileUri, token) => {
  /**
   * Return a profile finded by id
   * @memberof ProfileService
   * @param {number} id - profile id
   * @returns {Profile}
   */
  const getOne = id => {
    return fetch(profileUri + id, {
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
   * Returns all Profiles
   * @memberof ProfileService
   * @returns {Profile[]}
   */
  const getAll = () => {
    return fetch(profileUri, {
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
   * Update a Profile and return it
   * @param {number} id - profile id
   * @param {ProfileRequest} profile - profile information
   * @returns {Profile}
   */
  const updateOne = (profile, id) => {
    return fetch(profileUri + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: {
        time_zone: profile.time_zone,
        locale: profile.locale
      }
    })
      .then(res => res.json())
      .catch(err => {
        return new Error("An error occurred whith the request");
      });
  };

  return {
    getOne,
    getAll,
    updateOne
  };
};

export default ProfileService;
