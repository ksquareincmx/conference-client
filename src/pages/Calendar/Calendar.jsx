import React from "react";
import { BookingConsumer, BookingProvider } from "providers/Booking";
import { RoomConsumer, RoomProvider } from "providers/Room";
import { UserConsumer, UserProvider } from "providers/User";
import CalendarPageLogic from "./CalendarPageLogic";
import { NavBar } from "components/NavBar";
import { Redirect } from "react-router-dom";
import { withAuthContext } from "hocs/Auth";
import { ModalFormProvider } from "providers/ModalForm";

const Calendar = ({ context: authContext }) => {
  const { isAuth } = authContext;
  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  const { sessionInfo } = authContext;
  return (
    <div>
      <NavBar auth={authContext} />
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
    </div>
  );
};

export const CalendarWithAuthContext = withAuthContext(Calendar);
