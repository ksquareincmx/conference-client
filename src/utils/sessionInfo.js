import { compose, prop, defaultTo } from "lodash/fp";

const validateUserInfo = defaultTo("");

const validateJWT = defaultTo("");

const validateUserName = compose(
  defaultTo(""),
  prop("name")
);

export { validateUserName, validateUserInfo, validateJWT };
