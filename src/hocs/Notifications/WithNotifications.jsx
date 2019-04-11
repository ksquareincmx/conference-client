import React from "react";
import { ToastConsumer } from "react-toast-notifications";
import { buildContentFromBooking } from "utils/notificationBuilder";

export function withNotifications(Component) {
  const notificationConfig = {
    autoDismissTimeout: 3000,
    autoDismiss: true
  };

  const handleSuccessfulNotification = showToast => ({
    bookingInfo,
    notificationType
  }) => {
    const content = buildContentFromBooking(bookingInfo, notificationType);
    showToast(content, notificationConfig);
  };

  const handleErrorNotification = showToast => ({ title, body }) => {
    const content = {
      message: {
        title,
        body
      },
      sticker: {
        color: "gray",
        text: "X"
      },
      variant: "error"
    };
    return showToast(content, notificationConfig);
  };

  return function WrappedComponent(props) {
    return (
      <ToastConsumer>
        {toasts => {
          const { add } = toasts;
          return (
            <Component
              onSuccessNotification={handleSuccessfulNotification(add)}
              onErrorNotification={handleErrorNotification(add)}
              {...props}
            />
          );
        }}
      </ToastConsumer>
    );
  };
}
