import React from "react";
import { BookingConsumer, BookingProvider } from "providers/Booking";
import CalendarPageLogic from "./CalendarPageLogic";

import { Redirect } from "react-router-dom";
import WithAuthContext from "../../hocs/Auth";

function Calendar({ context }) {
  const { jwt } = context;
  if (!jwt) {
    return <Redirect to="/login" />;
  }

  return (
    <BookingProvider auth={context}>
      <BookingConsumer>
        {bookingService => (
          <CalendarPageLogic bookingService={bookingService} auth={context} />
        )}
      </BookingConsumer>
    </BookingProvider>
  );
}

export default WithAuthContext(Calendar);
