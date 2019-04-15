import React from "react";
import { ToastProvider } from "react-toast-notifications";
import { NotificationSnackBar } from "../../pages/Calendar/components";
import { NotifcationContainer } from "../../pages/Calendar/components/NotificationContainer";

const NotificationProvider = ({ children }) => {
  return (
    <ToastProvider
      components={{
        Toast: NotificationSnackBar,
        ToastContainer: NotifcationContainer
      }}
    >
      {children}
    </ToastProvider>
  );
};

export { NotificationProvider };
