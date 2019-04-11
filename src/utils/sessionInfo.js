import { compose, prop, defaultTo } from "lodash/fp";

const validateUserInfo = defaultTo("");

const validateJWT = defaultTo("");

const getName = compose(
  defaultTo(""),
  prop("name")
);

export { getName, validateUserInfo, validateJWT };
