/**
 * @typedef {Object} Profile
 * @property {number} id - profile id
 * @property {string} locale - profile locale
 * @property {string} time_zone - profile time_zone
 * @property {string} createdAt - profile creation date
 * @property {string} updatedAt - profile updated date
 * @property {number} userId - profile user id
 */

/**
 *@typedef {Object} RefreshToken
 *@property {number} expires - token expiration time
 *@property {number} expiresIn - seconds to expire
 */

/**
 * @typedef {Object} Credentials
 * @property {number} expires - expiration time
 * @property {Profile} profile - user profile
 * @property {RefreshToken} refresh_token - refresh token information
 * @property {string} token - access token
 * @property {User} user - user info
 */

/**
 * @version 1.0
 * @exports AuthService
 * @namespace AuthService
 * @property {string} authServiceURL - auth uri
 */

export const AuthService = authServiceURL => {
  /**
   * Return credentials
   * @param {string} idToken - id token
   * @returns {Credentials}
   */
  const onLogin = async idToken => {
    try {
      const res = await fetch(authServiceURL, {
        method: "POST",
        body: JSON.stringify({
          idToken
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return new Error("An error occurred whith the request");
    }
  };

  return { onLogin };
};
