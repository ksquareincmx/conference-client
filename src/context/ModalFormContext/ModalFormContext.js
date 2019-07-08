import { createContext } from "react";

export const ModalFormContext = createContext({
  handleOnClickCreateMeeting: () => {},
  handleOnClickEditMeeting: () => {},
  handleOnCloseModal: () => {},
  handleDeleteMeeting: () => {},
  handleCloseDialog: () => {}
});
