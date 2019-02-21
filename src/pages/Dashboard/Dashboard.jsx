import React from "react";
import { BookingConsumer, BookingProvider } from "providers/Booking";
import { RoomConsumer, RoomProvider } from "providers/Room";
import { UserConsumer, UserProvider } from "providers/User";
import { AuthConsumer } from "providers/Auth";
import NavBar from "components/NavBar/NavBar";
import AppointmentCard from "components/AppointmentCard/";
import { Grid } from "@material-ui/core";
import { BookingsSideBar } from "../../components/BookingsSideBar/BookingsSideBar";

class DashboardPageLogic extends React.Component {
  render() {
    const { auth } = this.props;

    return (
      <div>
        <NavBar auth={auth} />
        <Grid container direction="row">
          <Grid item xs={3}>
            <BookingsSideBar auth={auth} />
          </Grid>
          <Grid item xs={9}>
            <BookingProvider auth={auth}>
              <BookingConsumer>
                {booking => (
                  <RoomProvider auth={auth}>
                    <RoomConsumer>
                      {roomService => (
                        <UserProvider auth={auth}>
                          <UserConsumer>
                            {userService => (
                              <AppointmentCard
                                booking={booking}
                                auth={auth}
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
}

function VerifyAuth(auth) {
  if (auth.jwt !== null) {
    return <DashboardPageLogic auth={auth} />;
  }
}

function DashboardPage() {
  return <AuthConsumer>{auth => VerifyAuth(auth)}</AuthConsumer>;
}

export default DashboardPage;
