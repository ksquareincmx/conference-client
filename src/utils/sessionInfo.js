import { compose, prop, defaultTo } from "lodash/fp";

const validateUserInfo = compose(defaultTo(""));

const validateJWT = compose(defaultTo(""));

const getUserName = compose(
  defaultTo(""),
  prop("name"),
  prop("user")
);

export { getUserName, validateUserInfo, validateJWT };
