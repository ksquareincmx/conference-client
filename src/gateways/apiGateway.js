import { servicesRoutes } from "./services-routes";

// TODO: Define the interfaces when TS is installed
/**
 * @typedef {Object} doGETConfig
 */

/**
 * @typedef {Object} doPOSTConfig
 */

/**
 * @typedef {Object} doUPDATEConfig
 */

/**
 * @typedef {Object} doDELETEConfig
 */

export const APIGateway = () => {
  /**
   * Do a GET Request to API
   * @param {string} service  - service name.
   * @param {doGETConfig} config - get request config.
   * @return {Promise} - Result of the request
   */
  const doGet = async (service, config) => {
    const { getServiceURI } = servicesRoutes[service];
    const serviceURI = getServiceURI(config);
    const { authToken } = config;
    try {
      return await fetch(serviceURI, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      });
    } catch (error) {
      return Promise.reject(new Error("An error occurred in the GET request"));
    }
  };

  /**
   * Do a POST Request to API
   * @param {string} service  - service name.
   * @param {doPOSTConfig} config - post request config.
   * @return {Promise} - Result of the request
   */
  const doPost = async (service, config) => {
    const { getServiceURI } = servicesRoutes[service];
    const serviceURI = getServiceURI(config);
    const { createBody, authToken } = config;
    const body = JSON.stringify(createBody);
    try {
      return await fetch(serviceURI, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      });
    } catch (error) {
      return Promise.reject(new Error("An error occurred in the POST request"));
    }
  };

  /**
   * Do a UPDATE Request to API
   * @param {string} service  - service name.
   * @param {doUPDATEConfig} config - update request config.
   * @return {Promise} - Result of the request
   */
  const doUpdate = async (service, config) => {
    const { getServiceURI } = servicesRoutes[service];
    const serviceURI = getServiceURI(config);
    const { updateBody, authToken } = config;
    const body = JSON.stringify(updateBody);
    try {
      return await fetch(serviceURI, {
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      });
    } catch (error) {
      return Promise.reject(new Error("An error occurred in the PUT request"));
    }
  };

  /**
   * Do a DELETE Request to API
   * @param {string} service  - service name.
   * @param {doDELETEConfig} config - delete request config.
   * @return {Promise} - Result of the request
   */
  const doDelete = async (service, config) => {
    const { getServiceURI } = servicesRoutes[service];
    const serviceURI = getServiceURI(config);
    const { authToken } = config;
    try {
      return await fetch(serviceURI, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      });
    } catch (error) {
      return Promise.reject(
        new Error("An error occurred in the DELETE request")
      );
    }
  };

  return {
    doGet,
    doPost,
    doUpdate,
    doDelete
  };
};
