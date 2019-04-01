import { compose, prop, defaultTo } from "lodash/fp";

const validateUserInfo = defaultTo("");

const validateJWT = defaultTo("");

const getUserName = compose(
  defaultTo(""),
  prop("name"),
  prop("user")
);

export { getUserName, validateUserInfo, validateJWT };
