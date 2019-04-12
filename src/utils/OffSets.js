export const getOffsets = eventColor => {
  switch (eventColor) {
    case "green":
      return {
        left: "unset",
        right: "0%"
      };
    case "blue":
      return {
        left: "0%",
        right: "unset"
      };
    default:
      return {};
  }
};
