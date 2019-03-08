import { compose, prop, defaultTo } from "lodash/fp";

const getUserName = compose(
  defaultTo(""),
  prop("name"),
  prop("user")
);

const getAuthToken = compose(
  defaultTo(""),
  prop("jwt")
);

export { getUserName, getAuthToken };
