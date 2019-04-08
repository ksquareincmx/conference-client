import {
  validateUserInfo,
  validateJWT,
  validateUserName
} from "utils/sessionInfo";
import compose from "lodash/fp/compose";

/**
 * @typedef {Object} JWT
 * @property {number} expires - token expiration time.
 * @property {RefreshToken} refreshToken - refresh token information.
 * @property {string} token - authorization token.
 */

/**
 * @typedef {Object} RefreshToken
 * @property {number} expires - token expiration time.
 * @property {number} expiresIn - seconds to expire.
 * @property {string} token - refresh token.
 */

/**
 * @typedef {Object} User
 * @property {number} id - user id.
 * @property {string} name - user name.
 * @property {string} email - user email.
 * @property {string} role - user role.
 */

/**
 * @typedef {Object} SessionInfo
 * @property {JWT} token - authorization token.
 * @property {User} user - user info.
 */

/**
 * @version 1.0
 * @exports StorageService
 * @namespace StorageSertvice
 */

export const StorageService = () => {
  /**
   * Returns an item in local storage
   * @param {string} item - item name in local storage
   * @returns {Object} - an item
   */
  const getItem = item => JSON.parse(localStorage.getItem(item));

  /**
   * Return JWT.
   * @returns {JWT | string} - JWT if is valid, empty string if not.
   */
  const getJWT = () =>
    compose(
      validateJWT,
      getItem
    )("cb_jwt");

  /**
   * Returns user info.
   * @returns {User | string} - user info if is valid, empty string if not.
   */
  const getUserInfo = () =>
    compose(
      validateUserInfo,
      getItem
    )("cb_user");

  /**
   * Returns user name.
   * @param {User} - user info.
   * @returns {string} - user name
   */
  const getUserName = () =>
    compose(
      validateUserName,
      getUserInfo
    )();

  /**
   * Update local storage with actual session info.
   * @param {SessionInfo} sessionInfo - session info.
   */
  const updateInfoInStorage = ({ jwt, user }) => {
    localStorage.setItem("cb_jwt", JSON.stringify(jwt));
    localStorage.setItem("cb_user", JSON.stringify(user));
  };

  return {
    getJWT,
    getUserInfo,
    getUserName,
    updateInfoInStorage
  };
};
