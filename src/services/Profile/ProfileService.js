import { APIGateway } from "api-gateway";

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
 * @param storageService - service used for access to session info
 */
export const ProfileService = storageService => {
  /**
   * Profile service require the auth token for requests
   */
  const { token: authToken } = storageService.getJWT();

  /**
   * Return the found profile information.
   * @memberof ProfileService
   * @param {number} id - profile id.
   * @returns {ProfileResponse} - found profile information.
   */
  const getOneById = async id => {
    const config = { id, authToken };
    try {
      const res = await APIGateway.doGet("getProfileById", config);
      return await res.json();
    } catch (error) {
      return new Error(error.message);
    }
  };

  /**
   * Returns all Profiles information.
   * @memberof ProfileService
   * @returns {ProfileResponse[]} - found profiles information.
   */
  const getAll = async () => {
    const config = { authToken };
    try {
      const res = await APIGateway.doGet("getAllProfiles", config);
      return await res.json();
    } catch (error) {
      return new Error(error.message);
    }
  };

  /**
   * Update the Profile information and return it.
   * @param {number} id - profile id.
   * @param {Profile} profile - profile information.
   * @returns {ProfileResponse} - profile updated information.
   */
  const updateOneById = async (id, { time_zone, locale }) => {
    const config = {
      id,
      body: {
        time_zone,
        locale
      },
      authToken
    };
    try {
      const res = await APIGateway.doUpdate("updateProfileById", config);
      return await res;
    } catch (error) {
      return new Error(error.message);
    }
  };

  return {
    getOneById,
    getAll,
    updateOneById
  };
};
