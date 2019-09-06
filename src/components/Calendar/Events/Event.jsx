import React, { useState, useRef } from "react";
import { withStyles, ClickAwayListener } from "@material-ui/core";
import { EventToolTip } from "./EventToolTip/EventToolTip";
import { ModalFormConsumer } from "providers";
import { storageService } from "services";
import { useStyles } from "hooks/useStyles";

const styles = {
  eventContainter: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "0.9em"
  }
};

export const Event = ({ content, onBookingsDataChange, isSingleGrid }) => {
  const [isOpen, updateIsOpen] = useState(false);
  const [isOwner, updateIsOwner] = useState(false);
  const ref = useRef(null);
  const { eventContainter } = useStyles(styles);

  const handleTooltipClose = () => updateIsOpen(false);
  const handleTooltipOpen = () => {
    const { id: userId } = content.event.booking.user;
    const { id: sessionUserId } = storageService.getUserInfo();

    if (sessionUserId === userId) {
      updateIsOpen(true);
      const eventEnd = new Date(content.event.booking.end).getTime();
      if (eventEnd > Date.now()) {
        return updateIsOwner(true);
      }
      return;
    }
    return updateIsOpen(true);
  };

  const { title } = content.event;
  return (
    <ModalFormConsumer>
      {({ handleOnClickEditMeeting, handleDeleteMeeting }) => (
        <EventToolTip
          content={content.event}
          handleTooltipClose={handleTooltipClose}
          handleTooltipOpen={handleTooltipOpen}
          onEdit={handleOnClickEditMeeting}
          onDelete={handleDeleteMeeting}
          open={isOpen}
          isOwner={isOwner}
          onBookingsDataChange={onBookingsDataChange}
          isSingleGrid={isSingleGrid}
        >
          <div
            className={eventContainter}
            onClick={handleTooltipOpen}
            ref={ref}
            tabIndex="0"
            onBlur={handleTooltipClose}
          >
            <strong>{title}</strong>
          </div>
        </EventToolTip>
      )}
    </ModalFormConsumer>
  );
};
