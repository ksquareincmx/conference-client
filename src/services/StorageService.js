/**
 * @typedef {Object} AuthToken
 * @property {number} expires - token expiration time
 * @property {RefreshToken} refreshToken - refresh token information
 * @property {string} token - authorization token
 */

/**
 * @typedef {Object} RefreshToken
 * @property {number} expires - token expiration time
 * @property {number} expiresIn - seconds to expire
 * @property {string} token - refresh token
 */

/**
 * @typedef {Object} User
 * @property {number} id - user id
 * @property {string} name - user name
 * @property {string} email - user email
 * @property {string} role - user role
 */

/**
 * @typedef {Object} SessionInfo
 * @property {AuthToken} token - authorization token
 * @property {User} user - user info
 */

/**
 * @version 1.0
 * @exports StorageService
 * @namespace StorageSertvice
 */

const StorageService = () => {
  /**
   * Return authorization token
   * @returns {AuthToken}
   */
  const getAuthToken = () => JSON.parse(localStorage.getItem("cb_jwt"));

  /**
   * Returns user info
   * @returns {User}
   */
  const getUserInfo = () => JSON.parse(localStorage.getItem("cb_user"));

  /**
   * Update local storage with actual session info
   * @param {SessionInfo} sessionInfo - session info
   */
  const updateInfoInStorage = ({ jwt, user }) => {
    localStorage.setItem("cb_jwt", JSON.stringify(jwt));
    localStorage.setItem("cb_user", JSON.stringify(user));
  };

  return {
    getAuthToken,
    getUserInfo,
    updateInfoInStorage
  };
};

export default StorageService;
