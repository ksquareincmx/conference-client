import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { bookingService } from "services";
import { Calendar } from "./Calendar";
import { getUTCDateFilter } from "utils/BookingFilters";
import { AuthContext } from "context/AuthContext";
import { useInterval } from "hooks/useInterval";

const REFRESH_TIME = 5000;

export const CalendarContainer = () => {
  const { roomId } = useParams();
  const history = useHistory();
  const [bookings, updateBookings] = useState([]);
  const [allBookings, updateAllBookings] = useState([]);
  const [isLoading, updateIsLoading] = useState(true);
  const [shouldFetch, updateShouldFetch] = useState(false);
  const authContext = useContext(AuthContext);
  const onBookingsDataChange = () => updateShouldFetch(!shouldFetch);

  const fetchBookings = async () => {
    try {
      const allData = await bookingService.getAllWithDetails(
        getUTCDateFilter(),
      );

      const data = await bookingService.getAllWithDetailsByRoom(
        getUTCDateFilter(),
        roomId,
      );

      updateAllBookings(allData);
      updateBookings(data);
      return updateIsLoading(false);
    } catch (error) {
      if (error.status === 401) {
        authContext.onLogout();
        return history.push("/login");
      }
    } finally {
      updateIsLoading(false);
    }
  };

  useEffect(() => {
    // TODO: update state ONLY if there's no data;
    fetchBookings();
    // whenever shouldFetch changes, it will call `fetchBookings`
    // eslint-disable-next-line
  }, [shouldFetch]);

  useInterval(() => {
    fetchBookings();
  }, REFRESH_TIME);

  return (
    <Calendar
      allBookingsData={allBookings}
      bookingsData={bookings}
      onBookingsDataChange={onBookingsDataChange}
      isLoading={isLoading}
    />
  );
};
