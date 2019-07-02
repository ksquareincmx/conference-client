<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { withRouter, Redirect } from "react-router-dom";
import compose from "lodash/fp/compose";
=======
import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
>>>>>>> refactor(Calendar): convert to hooks #1
import { bookingService, roomService } from "services";
import { Calendar } from "./Calendar";
import { Error500 } from "pages/Error500";
import { getUTCDateFilter } from "utils/BookingFilters";
import { withAuthContext } from "hocs/Auth";
import { AuthContext } from "context/AuthContext";

function CalendarContainerComponent({ URLRoomId, history }) {
  const [bookingsData, setBookingsData] = useState([]);
  const [allBookingsData, setAllBookingsData] = useState([]);
  const [isServerDown, setIsServerDown] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const authContext = useContext(AuthContext);

  const fetchBookings = async () => {
    try {
      const { onLogout } = authContext;
      const reqRoom = await roomService.getOneById(URLRoomId);
      const allData = await bookingService.getAllWithDetails(
        getUTCDateFilter()
      );
      const data = await bookingService.getAllWithDetailsByRoom(
        getUTCDateFilter(),
        URLRoomId
      );
      if (data.bookings && allData.bookings) {
        const { bookings: allBookingsData } = allData;
        const { bookings: bookingsData } = data;
        setAllBookingsData(allBookingsData);
        setBookingsData(bookingsData);
      } else {
        const { name } = data;
        // The webtoken is invalid for any reason
        if (name === "JsonWebTokenError") {
          onLogout();
          return history.push("/login");
        } else {
          setIsServerDown(true);
        }
      }
      if (typeof reqRoom === "object") {
        setIsLoading(false);
        return setRoomId(URLRoomId);
      }
      return setIsLoading(true);
    } catch (error) {
      return Promise.reject(new Error(error.message));
    }
  };

  // fetchBookings can't be called as `useEffect` param because it's async
  useEffect(() => fetchBookings(), []);
  if (isServerDown) {
    return <Error500 />;
  }

  return (
    <Calendar
      allBookingsData={allBookingsData}
      bookingsData={bookingsData}
      onBookingsDataChange={fetchBookings}
      URLRoomId={roomId}
      isLoading={isLoading}
    />
  );
}

export const CalendarContainer = compose(
  withRouter,
  withAuthContext
)(CalendarContainerComponent);
