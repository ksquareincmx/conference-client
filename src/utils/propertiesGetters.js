import { compose, prop, defaultTo } from "lodash/fp";

const getUserName = compose(
  defaultTo(""),
  prop("name"),
  prop("user"),
  prop("sessionInfo")
);

const getAuthToken = compose(
  defaultTo(""),
  prop("token")
);

export { getUserName, getAuthToken };
