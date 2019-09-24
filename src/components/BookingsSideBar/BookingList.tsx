import React from "react";
import { BookingItem } from "./BookingItem";
import * as bookingMapper from "mappers/BookingMapper";
import { IBooking } from "models/Booking";
import * as colors from "styles/colors";
import moment from "moment";
import styled from "styled-components";

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

const BookingListEmpty = styled.div`
  align-items: center;
  color: #808080;
  display: flex;
  justify-content: center;
  width: "100%";
`;

export const BookingListContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const BookingListMonthBlock = styled.div`
  display: block;
  width: 100%;
`;

export const BookingListMonthLabel = styled.div`
  background-color: ${colors.PRIMARY_DEFAULT};
  padding: 0.25rem 0;
  font-size: 0.9rem;
`;

export const BookingListMonthName = styled.h3`
  box-sizing: border-box;
  color: ${colors.WHITE};
  font-size: 0.9rem;
  margin: 0;
  padding-left: 2.5rem;
`;

export const BookingListDayBlock = styled.div`
  box-sizing: border-box;
  padding: 0 2.5rem;
`;

export const BookingListDayDate = styled.h4`
  color: ${colors.SECONDARY_TEXT};
`;

export const BookingListDayNumber = styled.span`
  color: ${colors.PRIMARY_DEFAULT};
  font-weight: bold;
`;

export interface IBookingListProps {
  bookingsData: IBooking[];
}

export const BookingList: React.SFC<IBookingListProps> = ({
  bookingsData = [],
}) => {
  const bookings = bookingsData.map(bookingMapper.mapToListFormat);

  if (bookings.length === 0) {
    return (
      <BookingListEmpty>
        <h2>No results found</h2>
      </BookingListEmpty>
    );
  }

  const groupedByMonth = groupByMonth(bookings);

  return (
    <BookingListContainer>
      {Object.keys(groupedByMonth).map((month: string, index: number) => {
        const bookingList = groupedByMonth[month] as IBooking[];
        const groupedByDay = groupByDay(bookingList);

        return (
          <BookingListMonthBlock key={index}>
            <BookingListMonthLabel>
              <BookingListMonthName>
                {getHumanMonth(month)}
              </BookingListMonthName>
            </BookingListMonthLabel>

            {Object.keys(groupedByDay).map((key: string, index: number) => {
              const group = groupedByDay[key];

              return (
                <BookingListDayBlock key={index}>
                  <BookingListDayDate>
                    {key.split("_")[1]}{" "}
                    <BookingListDayNumber>
                      {key.split("_")[2]}
                    </BookingListDayNumber>
                  </BookingListDayDate>
                  {group.map((booking: IBooking) => (
                    <BookingItem key={booking.id} booking={booking} />
                  ))}
                </BookingListDayBlock>
              );
            })}
          </BookingListMonthBlock>
        );
      })}
    </BookingListContainer>
  );
};
