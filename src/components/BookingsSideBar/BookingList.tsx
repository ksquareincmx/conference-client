import React from "react";
import { BookingItem } from "./BookingItem";
import * as bookingMapper from "mappers/BookingMapper";
import { IBooking } from "models/Booking";
import * as colors from "styles/colors";
import moment from "moment";

const groupByMonth = (
  bookingList: IBooking[],
): { [key: string]: IBooking[] } => {
  return bookingList.reduce((acc: any, booking: IBooking) => {
    const date = new Date(booking.start);
    const key = `${date.getUTCMonth()}`;
    if (acc[key]) {
      acc[key].push(booking);
    } else {
      acc[key] = [booking];
    }

    return acc;
  }, {});
};

const getHumanMonth = (month: string): string => {
  const monthValues: { [key: string]: string } = {
    1: "JANUARY",
    2: "FEBRUARY",
    3: "MARCH",
    4: "APRIL",
    5: "MAY",
    6: "JUNE",
    7: "JULY",
    8: "AUGUST",
    9: "SEPTEMBER",
    10: "OCTOBER",
    11: "NOVEMBER",
    12: "DECEMBER",
  };

  return monthValues[month];
};

const getShortDayName = (day: string): string => {
  const days: { [key: string]: string } = {
    1: "MON",
    2: "TU",
    3: "WEN",
    4: "THU",
    5: "FRI",
    6: "SAT",
    7: "SUN",
  };

  return days[day];
};

const getHumanDay = (date: string) => {
  return new Date(date).getUTCDate();
};

const getTitleMonth = (date: string) => {
  const d = moment(date);
  const day = d.day();
  return getShortDayName(String(day));
};

const getYear = (date: string) => {
  return new Date(date).getFullYear();
};

const groupByDay = (bookingList: IBooking[]) => {
  return bookingList.reduce((acc: any, booking: IBooking) => {
    const key = `${getYear(booking.start)}_${getTitleMonth(
      booking.start,
    )}_${getHumanDay(booking.start)}`;

    if (acc[key]) {
      acc[key].push(booking);
    } else {
      acc[key] = [booking];
    }

    return acc;
  }, {});
};

export const BookingList: React.SFC<any> = ({
  bookingsData = [],
  onBookingsDataChange,
}) => {
  const bookings = bookingsData.map(bookingMapper.mapToListFormat);

  if (bookings.length === 0) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          color: "#808080",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>No results found</h2>
      </div>
    );
  }

  const groupedByMonth = groupByMonth(bookings);

  return (
    <ul
      style={{
        height: "100vh",
        margin: 0,
        padding: 0,
        width: "100%",
      }}
    >
      {Object.keys(groupedByMonth).map((month: string, index: number) => {
        const bookingList = groupedByMonth[month] as IBooking[];
        const groupedByDay = groupByDay(bookingList);

        return (
          <div key={index} style={{ display: "block", width: "100%" }}>
            <div
              style={{
                backgroundColor: colors.PRIMARY_DEFAULT,
                padding: "0.25rem 0",
                fontSize: "0.9rem",
              }}
            >
              <h3
                style={{
                  boxSizing: "border-box",
                  color: colors.WHITE,
                  fontSize: "0.9rem",
                  margin: 0,
                  paddingLeft: "2.5rem",
                }}
              >
                {getHumanMonth(month)}
              </h3>
            </div>
            {Object.keys(groupedByDay).map((key: string, index: number) => {
              const group = groupedByDay[key];

              return (
                <div
                  key={index}
                  style={{ boxSizing: "border-box", padding: "0 2.5rem" }}
                >
                  <h4 style={{ color: colors.SECONDARY_TEXT }}>
                    {key.split("_")[1]}{" "}
                    <span
                      style={{
                        color: colors.PRIMARY_DEFAULT,
                        fontWeight: "bold",
                      }}
                    >
                      {key.split("_")[2]}
                    </span>
                  </h4>
                  {group.map((booking: IBooking) => (
                    <BookingItem
                      key={booking.id}
                      booking={booking}
                      onBookingsDataChange={onBookingsDataChange}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        );
      })}
    </ul>
  );
};
