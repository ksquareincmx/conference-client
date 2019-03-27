import { APIServices } from "./services-routes";

export const APIGateway = () => {
  const doGet = async (service, config) => {
    /* I don't fell confortable doing this but
    if this is the only way... */
    const { getServiceURI } = APIServices[service];
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
      return new Error("An error ocurred in the GET request");
    }
  };

  const doPost = async (service, config) => {
    const { getServiceURI } = APIServices[service];
    const serviceURI = getServiceURI(config);
    const { createBody, authToken } = config;
    const body = JSON.stringify(createBody);
    try {
      return await fetch(serviceURI, {
        method: "POST",
        body,
        header: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      });
    } catch (error) {
      return new Error("An error ocured in the POST request");
    }
  };

  const doUpdate = async (service, config) => {
    const { getServiceURI } = APIServices[service];
    const serviceURI = getServiceURI(config);
    const { updateBody, authToken } = config;
    const body = JSON.stringify(updateBody);
    try {
      return await fetch(serviceURI, {
        method: "PUT",
        body,
        header: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      });
    } catch (error) {
      return new Error("An error ocured in the PUT request");
    }
  };

  const doDelete = async (service, config) => {
    const { getServiceURI } = APIServices[service];
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
      return new Error("An error ocurred in the DELETE request");
    }
  };

  return {
    doGet,
    doPost,
    doUpdate,
    doDelete
  };
};
