import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { bookingService, roomService } from "services";
import { Calendar } from "./Calendar";
import { Error500 } from "pages/Error500";
import { getUTCDateFilter } from "utils/BookingFilters";
import { AuthContext } from "context/AuthContext";

const CalendarContainerComponent = ({ URLRoomId, history }) => {
  const [bookingsData, updateBookingsData] = useState([]);
  const [allBookingsData, updateAllBookingsData] = useState([]);
  const [isServerDown, updateIsServerDown] = useState(false);
  const [roomId, updateRoomId] = useState("");
  const [isLoading, updateIsLoading] = useState(true);
  const [shouldFetch, updateShouldFetch] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
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
          updateAllBookingsData(allBookingsData);
          updateBookingsData(bookingsData);
        } else {
          const { name } = data;
          // The webtoken is invalid for any reason
          if (name === "JsonWebTokenError") {
            onLogout();
            history.push("/login");
            return undefined;
          } else {
            updateIsServerDown(true);
          }
        }
        if (typeof reqRoom === "object") {
          updateIsLoading(false);
          updateRoomId(URLRoomId);
          return undefined;
        }
        updateIsLoading(true);
        return undefined;
      } catch (error) {
        // Don't know how to do this with hooks
        Promise.reject(new Error(error.message));
        return undefined;
      }
    };

    fetchBookings();
    // whenever shouldFetch changes, it will call `fetchBookings`
  }, [shouldFetch]);

  if (isServerDown) {
    return <Error500 />;
  }

  const onBookingsDataChange = () => updateShouldFetch(!shouldFetch);

  return (
    <Calendar
      allBookingsData={allBookingsData}
      bookingsData={bookingsData}
      onBookingsDataChange={onBookingsDataChange}
      URLRoomId={roomId}
      isLoading={isLoading}
    />
  );
};

export const CalendarContainer = withRouter(CalendarContainerComponent);
