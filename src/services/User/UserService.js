/**
 * @typedef {Object} User
 * @property {number} authProviderId - user auth provider id.
 * @property {string} picture - user picture.
 * @property {string} name - user name.
 * @property {string} email - user email.
 */

/**
 * @typedef {Object} UserRequest
 * @property {number} authProviderId - user auth provider id.
 * @property {string} picture - user picture.
 * @property {string} name - user name.
 * @property {string} email - user email.
 * @property {string} password - user password.
 * @property {string} role - user role.
 */

/**
 * @version 1.0
 * @exports UserService
 * @namespace UserService
 * @param storageService - service used for access to session info
 */
export const UserService = storageService => {
  /**
   * User service require the auth token for requests
   */
  const { token: authToken } = storageService.getJWT();

  /**
   * Return URL for consuming the User API.
   * @memberof UserService
   * @return {string} - Base URL for all related Users requests.
   */
  const getUserApiURL = () => `${process.env.REACT_APP_SERVER_URI}User/`;

  /**
   * Return the found user information using the id.
   * @memberof UserSservice
   * @param {number} id - user id.
   * @returns {User} - found user information.
   */
  const getOneById = async id => {
    const baseURL = getUserApiURL();
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
    } catch (err) {
      return new Error("An error occurred whith the request");
    }
  };

  /**
   * Update the user information and return it.
   * @param {UserRequest} user - user information.
   * @param {number} id - user id.
   * @returns {User}
   */
  const updateOneById = async (user, id) => {
    const baseURL = getUserApiURL();
    const url = `${baseURL}${id}`;
    const { authProviderId, picture, name, email, password, role } = user;
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: {
          authProviderId,
          picture,
          name,
          email,
          password,
          role
        }
      });
      return await res.json();
    } catch (error) {
      return new Error("An error occurred whith the request");
    }
  };

  /**
   * Delete a user by id.
   * @memberof UserService
   * @param {number} id - user id.
   * @param {string} authToken - authorization token.
   */
  // TODO: @returns {NotContentResponse} - request response.
  const deleteOneByID = async id => {
    const baseURL = getUserApiURL();
    const url = `${baseURL}${id}`;
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${authToken}`
        }
      });
      return await res.json();
    } catch (error) {
      return new Error("An error occurred whith the request");
    }
  };

  return {
    getOneById,
    updateOneById,
    deleteOneByID
  };
};
