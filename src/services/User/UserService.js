import { apiGateway } from "gateways";

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
   * Return the found user information using the id.
   * @memberof UserSservice
   * @param {number} id - user id.
   * @returns {User} - found user information.
   */
  const getOneById = async id => {
    const config = { id, authToken };
    try {
      const res = await apiGateway.doGet("getUserById", config);
      return await res.json();
    } catch (error) {
      return new Error(error.message);
    }
  };

  /**
   * Update the user information and return it.
   * @param {number} id - user id.
   * @param {UserRequest} user - user information.
   * @returns {User} - updated user information
   */
  const updateOneById = async (
    id,
    { authProviderId, picture, name, email, password, role }
  ) => {
    const config = {
      id,
      body: {
        authProviderId,
        picture,
        name,
        email,
        password,
        role
      },
      authToken
    };
    try {
      const res = await apiGateway.doUpdate("updateUserById", config);
      return await res.json();
    } catch (error) {
      return new Error(error.message);
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
    const config = { id, authToken };
    try {
      const res = await apiGateway.doDelete("deleteUserById", config);
      // This is not tested, is probably that app crashes
      return await res;
    } catch (error) {
      return new Error(error.message);
    }
  };

  return {
    getOneById,
    updateOneById,
    deleteOneByID
  };
};
