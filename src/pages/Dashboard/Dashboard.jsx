import React from "react";
import { BookingConsumer, BookingProvider } from "providers/Booking";
import { RoomConsumer, RoomProvider } from "providers/Room";
import { UserConsumer, UserProvider } from "providers/User";
import { AuthConsumer } from "providers/Auth";
import NavBar from "components/NavBar/NavBar";
import AppointmentCard from "components/AppointmentCard/";

class DashboardPageLogic extends React.Component {
  render() {
    return (
      <BookingProvider auth={this.props.auth}>
        <BookingConsumer>
          {booking => (
            <RoomProvider auth={this.props.auth}>
              <RoomConsumer>
                {roomService => (
                  <UserProvider auth={this.props.auth}>
                    <UserConsumer>
                      {userService => (
                        <div>
                          <NavBar userName={this.props.auth.user.name} />
                          <AppointmentCard
                            booking={booking}
                            auth={this.props.auth}
                            roomService={roomService}
                            userService={userService}
                          />
                        </div>
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
