export const getOffsets = eventIsRight => {
  return eventIsRight
    ? {
        left: "unset",
        right: "0%"
      }
    : {
        left: "0%",
        right: "unset"
      };
};
