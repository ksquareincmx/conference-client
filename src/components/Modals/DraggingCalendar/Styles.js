export const getDateStyles = () => {
  return {
    dateContainer: {
      display: "flex",
      flexDirection: "column"
    },
    labels: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginLeft: 10,
      marginRight: 10
    },
    text: {
      fontWeight: "bold"
    },
    dateValuesContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10
    }
  };
};

export const getCardStyles = coordinates => {
  let top = 0;
  let bottom = 0;
  let right = 0;
  let left = 0;
  let display = "none";

  if (coordinates) {
    display = "flex";
    top = coordinates.top;
    bottom = coordinates.bottom;
    right = coordinates.right;
    left = coordinates.left;
  }

  return {
    cardContainer: {
      display: display,
      flexDirection: "column",
      height: 300,
      width: 230,
      backgroundColor: "#EAE8E8",
      position: "absolute",
      top: top,
      bottom: bottom,
      right: right,
      left: left,
      border: 1,
      borderStyle: "solid"
    }
  };
};

export const getButtonStyles = color => {
  return {
    button: {
      marginTop: 10,
      height: 30,
      width: 160,
      backgroundColor: color === "green" ? "#7ED321" : "#4A90E2",
      color: "white"
    },

    buttonGrid: {
      display: "flex",
      justifyContent: "center"
    }
  };
};

export const getReasonStyles = () => {
  return {
    reasonAppointment: {
      fontWeight: "bold",
      marginLeft: 10
    }
  };
};

export const getTimeStyles = () => {
  return {
    timeContainer: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 10
    },
    p: {
      marginLeft: 10
    },
    text: {
      fontWeight: "bold"
    }
  };
};
