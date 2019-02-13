
const validateReason = reason => reason !== '';

const validateInvite = attendeesList => attendeesList.length > 0;

const validateIsWeekDay = day => day > 0 && day < 6;

const validateIsCoherentDate = date => {
  const today = new Date();

  const isValidY = date.getFullYear() >= today.getFullYear();
  const isCurrentY = date.getFullYear() === today.getFullYear();
  const isValidM = isValidY ? (isCurrentY ?  date.getMonth() >= today.getMonth() : true) : false;
  const isCurrentM = isCurrentY ? date.getMonth() === today.getMonth() : false;
  const isValidD = isValidM ? (isCurrentM ? date.getDate() >= today.getDate() : true ) : false ;

  return isValidD;
}

const validateIsDiferentHour = (timeStart, timeEnd) => timeStart !== timeEnd;

const validateIsCoherentHour = (timeStart, timeEnd) => timeStart <= timeEnd

const validateWorkingHours = (timeStart, timeEnd) => {
  const startIsWH = timeStart.getHours() < 18;
  const endIsWH = timeEnd.getHours() < 18 ? true : timeEnd.getMinutes() === 0;

  return startIsWH && endIsWH;
}



const validateBooking = (bookingObj) => {
  const isValidReason = validateReason(bookingObj.description);
  const isValidInvite = validateInvite(bookingObj.attendees);

  const startDate = new Date(bookingObj.start);
  const endDate = new Date(bookingObj.end);

  const isWeekDay = validateIsWeekDay(startDate.getDay());
  const weekendMessage = isWeekDay ? "" :  "You can't make reservations on weekends" ;

  const isCoherentDate = validateIsCoherentDate(startDate);

  let dateMessage = isCoherentDate ? "" : "You can't make reservation before today's date";

  const isValidDate = isWeekDay && isCoherentDate;

  const isDiferentHour = validateIsDiferentHour(startDate.getTime(), endDate.getTime());
  const isCoherentHour = validateIsCoherentHour(startDate.getTime(), endDate.getTime());
  const isWorkingHours = validateWorkingHours(startDate, endDate);

  const isValidHour = isDiferentHour && isCoherentHour && isWorkingHours;

  let hourMessage = isDiferentHour ? "" : "The start time of the meeting can't be the same time of the end";
  hourMessage = isCoherentHour ? hourMessage : "The end time of the meeting can't be before the start time";
  hourMessage = isWorkingHours ? hourMessage : "You can't start or end a meeting after 6 pm";

  return ({
    specificValidations: {
      invalidWeekendMessage: weekendMessage,
      invalidDateMessage: dateMessage,
      invalidHourMessage: hourMessage,
      isInvalidDate: !isValidDate,
      isInvalidHour: !isValidHour,
      isInvalidReason: !isValidReason,
      isInvalidInvite: !isValidInvite,
    },
    isValidBooking: (isValidDate && isValidHour && isValidReason && isValidInvite)
  });
}

const isValidMail = mail => {
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return mail.match(mailFormat);
}

export {validateBooking, isValidMail};