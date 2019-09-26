import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { CalendarPageLogic } from "./CalendarPageLogic";
import { NavBar } from "components/NavBar";
import { BookingsSideBar } from "components/BookingsSideBar/BookingsSideBar";
import { withAuthContext } from "hocs";
import { NotificationProvider, ModalFormProvider } from "providers";
import { NoteCard } from "components/NoteCard";
import styled from "styled-components";
import { When } from "components/When/When";

export const ContentContainer = styled.div`
  display: flex;
  align-content: center;
  align-items: top;
  justify-content: flex-start;
`;

export const CalendarWrapper = styled.div`
  box-sizing: border-box;
  padding: 64px;
  width: calc(100vw - 400px);
`;

const CalendarPage = props => {
  const { roomId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const {
    authContext,
    allBookingsData,
    bookingsData,
    onBookingsDataChange,
    isLoading: isMainLoading
  } = props;
  const { isAuth, sessionInfo } = authContext;

  if (!isAuth && !isLoading) {
    return <Redirect to="/login" />;
  }

  return (
    <Fragment>
      <NavBar authContext={authContext} />
      <NotificationProvider>
        <ModalFormProvider onBookingsDataChange={onBookingsDataChange}>
          <ContentContainer>
            <BookingsSideBar
              bookingsData={allBookingsData}
              onBookingsDataChange={onBookingsDataChange}
            />
            <CalendarWrapper>
              <When predicate={isMainLoading}>
                <div>Loading...</div>
              </When>

              <When predicate={!roomId && !isMainLoading}>
                <NoteCard title="Error 404: Room not found." content={""} />
              </When>

              <When predicate={roomId && !isMainLoading}>
                <CalendarPageLogic
                  auth={sessionInfo}
                  bookingsData={bookingsData}
                  onBookingsDataChange={onBookingsDataChange}
                  isDrawerOpen={true}
                />
              </When>
            </CalendarWrapper>
          </ContentContainer>
        </ModalFormProvider>
      </NotificationProvider>
    </Fragment>
  );
};

export const Calendar = withAuthContext(CalendarPage);
