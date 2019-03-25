import React from "react";
import { Redirect } from "react-router-dom";
import { CalendarPageLogic } from "./CalendarPageLogic";
import { NavBar } from "components/NavBar";
import { withAuthContext } from "hocs";
import { NotificationProvider, ModalFormProvider } from "providers";

const Calendar = ({ context: authContext }) => {
  const { isAuth } = authContext;
  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  const { sessionInfo } = authContext;
  return (
    <div>
      <NavBar auth={authContext} />
      <NotificationProvider>
        <ModalFormProvider auth={sessionInfo}>
          <CalendarPageLogic auth={sessionInfo} />
        </ModalFormProvider>
      </NotificationProvider>
    </div>
  );
};

export const CalendarWithAuthContext = withAuthContext(Calendar);
