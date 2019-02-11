/**
  @typedef {Object} UserRequest
  @property {number} authProviderId - user auth provider id
  @property {string} picture - user picture
  @property {string} name - user name
  @property {string} email - user email
  @property {string} password - user password
  @property {string} role - user role
*/

/**
 * @version 1.0
 * @exports UserService
 * @namespace UserService
 * @property {string} userUri - user uri
 * @property {string} token - user token
 */
const UserService = (userUri, token) => {
  /**
   * Return a User by id
   * @param {number} id - user id
   * @returns {User}
   */
  const getOne = id => {
    return fetch(userUri + id, {
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
   * Update an user and return it
   * @param {UserRequest} user - user information
   * @param {number} id - user id
   * @returns {User}
   */
  const updateOne = (user, id) => {
    return fetch(userUri + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: {
        authProviderId: user.authProviderId,
        picture: user.picture,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
      }
    })
      .then(res => res.json())
      .catch(err => {
        return new Error("An error occurred whith the request");
      });
  };

  /**
   * Delete a user by id
   * @memberof UserService
   * @param {number} id - user id
   */
  const deleteOne = id => {
    return fetch(userUri + id, {
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
    getOne,
    updateOne,
    deleteOne
  };
};

export default UserService;
