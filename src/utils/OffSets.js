const rightStyle = () => ({ left: "unset", right: "0%" });

const leftStyle = () => ({ left: "0%", right: "unset" });

export const getOffsets = eventIsRight => {
  return eventIsRight ? rightStyle() : leftStyle();
};
