import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { bookingService, roomService } from "services";
import { Calendar } from "./Calendar";
import { Error500 } from "pages/Error500";
import { getUTCDateFilter } from "utils/BookingFilters";
import { AuthContext } from "../../context/AuthContext";

function CalendarContainerComponent({ URLRoomId, history }) {
  const [bookingsData, setBookingsData] = useState([]);
  const [allBookingsData, setAllBookingsData] = useState([]);
  const [isServerDown, setIsServerDown] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [shouldFetch, setShouldFetch] = useState(false);
  const authContext = useContext(AuthContext);

  // fetchBookings can't be called as `useEffect` first param because it's async
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
          setAllBookingsData(allBookingsData);
          setBookingsData(bookingsData);
        } else {
          const { name } = data;
          // The webtoken is invalid for any reason
          if (name === "JsonWebTokenError") {
            onLogout();
            history.push("/login");
            return undefined;
          } else {
            setIsServerDown(true);
          }
        }
        if (typeof reqRoom === "object") {
          setIsLoading(false);
          setRoomId(URLRoomId);
          return undefined;
        }
        setIsLoading(true);
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

  const onBookingsDataChange = () => setShouldFetch(true);

  return (
    <Calendar
      allBookingsData={allBookingsData}
      bookingsData={bookingsData}
      onBookingsDataChange={onBookingsDataChange}
      URLRoomId={roomId}
      isLoading={isLoading}
    />
  );
}

export const CalendarContainer = withRouter(CalendarContainerComponent);
