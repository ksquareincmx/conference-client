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
 */
export const UserService = () => {
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
   * @param {string} authToken - authorization token.
   * @returns {User} - found user information.
   */
  const getOne = (id, authToken) => {
    const baseURL = getUserApiURL();
    const url = `${baseURL}${id}`;
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .catch(err => new Error("An error occurred whith the request"));
  };

  /**
   * Update the user information and return it.
   * @param {UserRequest} user - user information.
   * @param {number} id - user id.
   * @returns {User}
   */
  const updateOne = (user, id, authToken) => {
    const baseURL = getUserApiURL();
    const url = `${baseURL}${id}`;
    const { authProviderId, picture, name, email, password, role } = user;
    return fetch(url, {
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
    })
      .then(res => res.json())
      .catch(err => new Error("An error occurred whith the request"));
  };

  /**
   * Delete a user by id.
   * @memberof UserService
   * @param {number} id - user id.
   * @param {string} authToken - authorization token.
   */
  // TODO: @returns {NotContentResponse} - request response.
  const deleteOne = (id, authToken) => {
    const baseURL = getUserApiURL();
    const url = `${baseURL}${id}`;
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .catch(err => new Error("An error occurred whith the request"));
  };

  return {
    getOne,
    updateOne,
    deleteOne
  };
};