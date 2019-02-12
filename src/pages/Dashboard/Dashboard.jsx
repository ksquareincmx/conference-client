import React from "react";
import { BookingConsumer, BookingProvider } from "providers/Booking";
import { RoomConsumer, RoomProvider } from "providers/Room";
import { UserConsumer, UserProvider } from "providers/User";
import { AuthConsumer } from "providers/Auth";
import NavBar from "components/NavBar/NavBar";
import AppointmentCard from "components/AppointmentCard/";

class DashboardPageLogic extends React.Component {
  render() {
    const { auth } = this.props;

    return (
      <div> 
        <NavBar auth={auth} />
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
