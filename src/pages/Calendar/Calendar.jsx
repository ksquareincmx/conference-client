import React from "react";
import { BookingConsumer, BookingProvider } from "providers/Booking";
import CalendarPageLogic from "./CalendarPageLogic";

import { Redirect } from "react-router-dom";
import { withAuthContext } from "../../hocs/Auth";

function Calendar({ context: { isAuth, sessionInfo } }) {
  if (!isAuth) {
    return <Redirect to="/login" />;
  }

  return (
    <BookingProvider auth={sessionInfo}>
      <BookingConsumer>
        {bookingService => (
          <CalendarPageLogic
            bookingService={bookingService}
            auth={sessionInfo}
          />
        )}
      </BookingConsumer>
    </BookingProvider>
  );
}

export const CalendarWithAuthContext = withAuthContext(Calendar);
