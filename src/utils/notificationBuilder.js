export const buildContentFromBooking = (
  { userName, color, abbvRoomName },
  notificationType
) => {
  const { title, body } = getMessageContent(notificationType, userName);
  return {
    message: {
      title,
      body
    },
    sticker: {
      color,
      text: abbvRoomName
    },
    variant: "success"
  };
};

const CREATE_NOTIFICATION = "create";
const EDIT_NOTIFICATION = "edit";
const DELETE_NOTIFICATION = "delete";

const getMessageContent = (notificationType, userName) => {
  switch (notificationType) {
    case CREATE_NOTIFICATION:
      return {
        title: "New booking created",
        body: `${userName} has created new booking`
      };
    case EDIT_NOTIFICATION:
      return {
        title: "Booking edited succesfully",
        body: `${userName} has edited a booking`
      };
    case DELETE_NOTIFICATION:
      return {
        title: "Booking deleted succesfully",
        body: `${userName} has deleted a booking`
      };
  }
};
