/**
 * @typedef {Object} Profile
 * @property {string} time_zone - profile time zone.
 * @property {string} locale - profile language.
 */

/**
 * @typedef {Object} ProfileResponse
 * @property {number} id - profile id.
 * @property {string} time_zone - profile time zone.
 * @property {string} locale - profile language.
 */

/**
 * @version 1.0
 * @exports ProfileService
 * @namespace ProfileService
 */
export const ProfileService = () => {
  /**
   * Return URL for consuming the Profile API.
   * @memberof ProfileService
   * @return {string} - Base URL for all related Profiles requests.
   */
  const getProfileApiURL = () => `${process.env.REACT_APP_SERVER_URI}Profile/`;
  /**
   * Return the found profile information.
   * @memberof ProfileService
   * @param {number} id - profile id.
   * @param {string} authToken - authorization token.
   * @returns {ProfileResponse} - found profile information.
   */
  const getOne = (id, authToken) => {
    const baseURL = getProfileApiURL();
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
   * Returns all Profiles information.
   * @memberof ProfileService
   * @param {string} authToken - authorization token.
   * @returns {ProfileResponse[]} - found profiles information.
   */
  const getAll = authToken => {
    const baseURL = getProfileApiURL();
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
   * Update the Profile information and return it.
   * @param {Profile} profile - profile information.
   * @param {number} id - profile id.
   * @param {string} authToken - authorization token.
   * @returns {ProfileResponse} - profile updated information.
   */
  const updateOne = ({ time_zone, locale }, id, authToken) => {
    const baseURL = getProfileApiURL();
    const url = `${baseURL}${id}`;
    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer${authToken}`
      },
      body: {
        time_zone,
        locale
      }
    })
      .then(res => res.json())
      .catch(err => new Error("An error occurred whith the request"));
  };

  return {
    getOne,
    getAll,
    updateOne
  };
};
