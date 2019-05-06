const CREATE_NOTIFICATION = "create";
const EDIT_NOTIFICATION = "edit";
const DELETE_NOTIFICATION = "delete";

const getMessageContent = (notificationType, userName) => {
  switch (notificationType) {
    case CREATE_NOTIFICATION:
      return {
        title: "New Appointment created",
        body: `${userName} has created new appointment`
      };
    case EDIT_NOTIFICATION:
      return {
        title: "Appointment edited succesfully",
        body: `${userName} has edited a appointment`
      };
    case DELETE_NOTIFICATION:
      return {
        title: "Appointment deleted succesfully",
        body: `${userName} has deleted a appointment`
      };
  }
};

export const buildContentFromBooking = (
  { userName, bgColor, txtColor, abbvRoomName },
  notificationType
) => {
  const { title, body } = getMessageContent(notificationType, userName);
  return {
    message: {
      title,
      body
    },
    sticker: {
      bgColor,
      txtColor,
      text: abbvRoomName
    },
    variant: "success"
  };
};
