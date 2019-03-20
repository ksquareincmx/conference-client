import React from "react";
import { ToastProvider } from "react-toast-notifications";
import { NotificationSnackBar } from "../../pages/Calendar/components";

const NotificationProvider = ({ children }) => {
  return (
    <ToastProvider components={{ Toast: NotificationSnackBar }}>
      {children}
    </ToastProvider>
  );
};

export { NotificationProvider };
