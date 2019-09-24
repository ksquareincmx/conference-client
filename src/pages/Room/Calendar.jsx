import React, { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { CalendarPageLogic } from "./CalendarPageLogic";
import { NavBar } from "components/NavBar";
import { BookingsSideBar } from "components/BookingsSideBar/BookingsSideBar";
import { withAuthContext } from "hocs";
import { NotificationProvider, ModalFormProvider } from "providers";
import { NoteCard } from "components/NoteCard";
import styled from "styled-components";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const {
    authContext,
    allBookingsData,
    bookingsData,
    onBookingsDataChange,
    URLRoomId,
    isLoading: isMainLoading
  } = props;
  const { isAuth } = authContext;

  if (!isAuth && !isLoading) {
    return <Redirect to="/login" />;
  }

  const { sessionInfo } = authContext;

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
              {isMainLoading && <div>Loading...</div>}

              {!URLRoomId && !isMainLoading && (
                <NoteCard title="Error 404: Room not found." content={""} />
              )}

              {URLRoomId && !isMainLoading && (
                <CalendarPageLogic
                  auth={sessionInfo}
                  URLRoomId={URLRoomId}
                  bookingsData={bookingsData}
                  onBookingsDataChange={onBookingsDataChange}
                  isDrawerOpen={true}
                />
              )}
            </CalendarWrapper>
          </ContentContainer>
        </ModalFormProvider>
      </NotificationProvider>
    </Fragment>
  );
};

export const Calendar = withAuthContext(CalendarPage);
