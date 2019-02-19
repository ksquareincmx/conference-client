import React from "react";
import { BookingConsumer, BookingProvider } from "providers/Booking";
import { RoomConsumer, RoomProvider } from "providers/Room";
import { UserConsumer, UserProvider } from "providers/User";
import NavBar from "components/NavBar/NavBar";
import AppointmentCard from "components/AppointmentCard/";

import WithAuthContext from "../../hocs/Auth";
import { Redirect } from "react-router-dom";

function Dashboard({ context }) {
  const { jwt } = context;
  if (!jwt) {
    return <Redirect to="/Login" />;
  }

  const { onLogout } = context;
  const { name } = context.user;
  return (
    <div>
      <NavBar username={name} onLogout={onLogout} />
      <BookingProvider auth={context}>
        <BookingConsumer>
          {booking => (
            <RoomProvider auth={context}>
              <RoomConsumer>
                {roomService => (
                  <UserProvider auth={context}>
                    <UserConsumer>
                      {userService => (
                        <AppointmentCard
                          booking={booking}
                          auth={context}
                          roomService={roomService}
                          userService={userService}
                        />
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
}

export default WithAuthContext(Dashboard);
