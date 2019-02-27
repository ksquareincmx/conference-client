import moment from "moment";

const validateReason = reason => reason !== "";

const validateInvite = attendeesList => attendeesList.length > 0;

const validateIsWeekDay = day => day > 0 && day < 6;

const validateIsCoherentDate = date => {
  const today = moment();

  const isValidY = date.year() >= today.year();
  const isCurrentY = date.year() === today.year();
  const isValidM = isValidY
    ? isCurrentY
      ? date.month() >= today.month()
      : true
    : false;
  const isCurrentM = isCurrentY ? date.month() === today.month() : false;
  const isValidD = isValidM
    ? isCurrentM
      ? date.date() >= today.date()
      : true
    : false;

  return isValidD;
};

const validateIsDiferentHour = (timeStart, timeEnd) => timeStart !== timeEnd;

const validateIsCoherentHour = (timeStart, timeEnd) => timeStart <= timeEnd;

const validateWorkingHours = (timeStart, timeEnd) => {
  const startIsWH = timeStart.hours() < 18;
  const endIsWH = timeEnd.hours() < 18 ? true : timeEnd.minutes() === 0;

  return startIsWH && endIsWH;
};

const validateBooking = bookingObj => {
  const isValidReason = validateReason(bookingObj.description);
  const isValidInvite = validateInvite(bookingObj.attendees);

  //Use this for Zulu UTC +00:00
  // const startDate = moment.utc(bookingObj.start).add(6, "hours")._d;
  // const endDate = moment.utc(bookingObj.end).add(6, "hours")._d;

  const startDate = moment(bookingObj.start);
  const endDate = moment(bookingObj.end);

  const isWeekDay = validateIsWeekDay(startDate.day());
  const weekendMessage = isWeekDay
    ? ""
    : "A meeting can't be booked on weekends";

  const isCoherentDate = validateIsCoherentDate(startDate);

  let dateMessage = isCoherentDate
    ? ""
    : "A meeting can't be booked before today's date";

  const isValidDate = isWeekDay && isCoherentDate;

  const isDiferentHour = validateIsDiferentHour(
    startDate.unix(),
    endDate.unix()
  );
  const isCoherentHour = validateIsCoherentHour(
    startDate.unix(),
    endDate.unix()
  );
  const isWorkingHours = validateWorkingHours(startDate, endDate);

  const isValidHour = isDiferentHour && isCoherentHour && isWorkingHours;

  let hourMessage = isDiferentHour
    ? ""
    : "The start time of the meeting can't be set at the same as the end time";
  hourMessage = isCoherentHour
    ? hourMessage
    : "The end time of the meeting can't be set earlier than the start time";
  hourMessage = isWorkingHours
    ? hourMessage
    : "A meeting can't start or finish after 18:00";

  return {
    specificValidations: {
      invalidWeekendMessage: weekendMessage,
      invalidDateMessage: dateMessage,
      invalidHourMessage: hourMessage,
      isInvalidDate: !isValidDate,
      isInvalidHour: !isValidHour,
      isInvalidReason: !isValidReason,
      isInvalidInvite: !isValidInvite
    },
    isValidBooking: isValidDate && isValidHour && isValidReason && isValidInvite
  };
};

const isValidMail = mail => {
  const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return mail.match(mailFormat);
};

export { validateBooking, isValidMail };
