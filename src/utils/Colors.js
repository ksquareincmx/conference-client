export const getEventColors = eventColor => {
  switch (eventColor) {
    case "green":
      return {
        backgroundColor: "#8fdb32",
        borderColor: "#599319",
        textColor: "#053000"
      };
    case "blue":
      return {
        backgroundColor: "#7bd1bd",
        borderColor: "#3BA18B",
        textColor: "#00543f"
      };
    default:
      return {};
  }
};
