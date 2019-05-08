import moment from "moment";

const validateReason = reason => reason !== "";

const validateIsWeekDay = day => day > 0 && day < 6;

const validateYear = (date, today) => date.year() >= today.year();

const isCurrentYear = (date, today) => date.year() === today.year();

export const isWorkingHour = (time, isStart) => {
  return isStart
    ? time.hours() < 18
    : time.hours() < 18
    ? true
    : time.minutes() === 0;
};

const validateIsCoherentDate = date => {
  const today = moment();

  const isValidY = validateYear(date, today);
  const isCurrentY = isCurrentYear(date, today);
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

const validateIsAfterCurrentHour = (timeStart, currentTime) =>
  timeStart > currentTime;

const validateWorkingHours = (timeStart, timeEnd) => {
  const isStart = true;
  const startIsWH = isWorkingHour(timeStart, isStart);
  const endIsWH = isWorkingHour(timeEnd, !isStart);

  return startIsWH && endIsWH;
};

const validateBooking = bookingObj => {
  const isValidReason = validateReason(bookingObj.description);

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

  const isAfterCurrentHour = isCoherentDate
    ? validateIsAfterCurrentHour(startDate.unix(), moment().unix())
    : true;

  const isValidHour =
    isDiferentHour && isCoherentHour && isWorkingHours && isAfterCurrentHour;

  let hourMessage = isDiferentHour
    ? ""
    : "The start time of the meeting can't be set at the same as the end time";
  hourMessage = isCoherentHour
    ? hourMessage
    : "The end time of the meeting can't be set earlier than the start time";
  hourMessage = isAfterCurrentHour
    ? hourMessage
    : `The start time of the meeting need to be set after ${moment().format(
        "HH:mm"
      )}`;
  hourMessage = isWorkingHours
    ? hourMessage
    : "A meeting can't start or finish after 18:00";

  return {
    InfoValidations: {
      invalidWeekendMessage: weekendMessage,
      invalidDateMessage: dateMessage,
      invalidHourMessage: hourMessage,
      isInvalidDate: !isValidDate,
      isInvalidHour: !isValidHour,
      isInvalidReason: !isValidReason
    },
    isValidBooking: isValidDate && isValidHour && isValidReason
  };
};

const isValidMail = mail => {
  const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return mail.match(mailFormat);
};

export { validateBooking, isValidMail };
