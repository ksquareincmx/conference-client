export const getOffsets = eventIsRight => {
  switch (eventIsRight) {
    case true:
      return {
        left: "unset",
        right: "0%"
      };
    case false:
      return {
        left: "0%",
        right: "unset"
      };
    default:
      return {};
  }
};
