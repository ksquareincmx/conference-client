import React from "react";
import { ToastProvider } from "react-toast-notifications";
import { NotificationSnackBar } from "components/NotificationSnackBar";
import { NotifcationContainer } from "components/NotificationContainer";

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
