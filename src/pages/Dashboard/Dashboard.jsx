import React from "react";
import { BookingConsumer, BookingProvider } from "providers/Booking";
import { RoomConsumer, RoomProvider } from "providers/Room";
import { UserConsumer, UserProvider } from "providers/User";
import { NavBar } from "components/NavBar";
import AppointmentCard from "components/AppointmentCard/";
import { Grid } from "@material-ui/core";
import { BookingsSideBar } from "../../components/BookingsSideBar/BookingsSideBar";

import { withAuthContext } from "../../hocs/Auth";
import { Redirect } from "react-router-dom";

function Dashboard({ context: { isAuth, sessionInfo } }) {
  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <NavBar auth={sessionInfo} />
      <Grid container direction="row">
        <Grid item xs={3}>
          <BookingsSideBar auth={sessionInfo} />
        </Grid>
        <Grid item xs={9}>
          <BookingProvider auth={sessionInfo}>
            <BookingConsumer>
              {booking => (
                <RoomProvider auth={sessionInfo}>
                  <RoomConsumer>
                    {roomService => (
                      <UserProvider auth={sessionInfo}>
                        <UserConsumer>
                          {userService => (
                            <AppointmentCard
                              booking={booking}
                              auth={sessionInfo}
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
        </Grid>
      </Grid>
    </div>
  );
}

export const DashboardWithAuthContext = withAuthContext(Dashboard);
