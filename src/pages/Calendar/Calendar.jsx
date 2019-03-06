import React from "react";
import { BookingConsumer, BookingProvider } from "../../providers/Booking";
import { RoomConsumer, RoomProvider } from "../../providers/Room";
import { UserConsumer, UserProvider } from "../../providers/User";
import CalendarPageLogic from "./CalendarPageLogic";

import { Redirect } from "react-router-dom";
import { withAuthContext } from "../../hocs/Auth";
import { ModalFormProvider } from "../../providers/ModalForm";

function Calendar({ context: { isAuth, sessionInfo } }) {
  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return (
    <BookingProvider auth={sessionInfo}>
      <BookingConsumer>
        {bookingService => (
          <RoomProvider auth={sessionInfo}>
            <RoomConsumer>
              {roomService => (
                <UserProvider auth={sessionInfo}>
                  <UserConsumer>
                    {userService => (
                      <ModalFormProvider
                        auth={sessionInfo}
                        bookingService={bookingService}
                        roomService={roomService}
                      >
                        <CalendarPageLogic
                          bookingService={bookingService}
                          auth={sessionInfo}
                          roomService={roomService}
                          userService={userService}
                        />
                      </ModalFormProvider>
                    )}
                  </UserConsumer>
                </UserProvider>
              )}
            </RoomConsumer>
          </RoomProvider>
        )}
      </BookingConsumer>
    </BookingProvider>
  );
}

export const CalendarWithAuthContext = withAuthContext(Calendar);
