import React from "react";
import { ModalFormConsumer } from "providers/ModalForm";
import { SelectRoom } from "./SelectRoom/SelectRoom";
import { withStyles, Button } from "@material-ui/core";
import classNames from "classnames";
import { CalendarViewSelectors } from "utils/Enums";

const styles = theme => ({
  createBtnContainer: {
    position: "relative"
  },
  createButton: {
    width: 200,
    height: 42,
    position: "absolute",
    right: 0,
    top: -60,
    backgroundColor: "#5294e5",
    color: "white",
    fontSize: 15
  },
  optionBar: {
    height: 65,
    backgroundColor: "#3049a1",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    borderRadius: "10px 10px 0px 0px"
  },
  optionButtons: {
    position: "absolute",
    top: -20
  },
  genericBtn: {
    boxShadow: "0px 2px 2px rgba(0,0,0,0.5)",
    backgroundColor: "white",
    fontSize: 20,
    textTransform: "capitalize",
    color: "#A7A7A7"
  },
  leftBtn: {
    height: 50,
    width: 140,
    borderRadius: "5px 0px 0px 5px",
    boxShadow: "0px 2px 2px rgba(0,0,0,0.5)",
    backgroundColor: "white",
    fontSize: 20,
    textTransform: "capitalize",
    color: "#A7A7A7"
  },
  middleBtn: {
    height: 50,
    width: 140,
    borderRadius: 0,
    boxShadow: "0px 2px 2px rgba(0,0,0,0.5)",
    backgroundColor: "white",
    fontSize: 20,
    textTransform: "capitalize",
    color: "#A7A7A7"
  },
  rightBtn: {
    height: 50,
    width: 140,
    borderRadius: "0px 5px 5px 0px",
    boxShadow: "0px 2px 2px rgba(0,0,0,0.5)",
    backgroundColor: "white",
    fontSize: 20,
    textTransform: "capitalize",
    color: "#A7A7A7"
  },
  currentBtn: {
    fontWeight: "bold",
    color: "#5294e5"
  }
});

const currentBtnStyle = {
  color: "#3049a1",
  fontWeight: "bold"
};

const cleanBtnStyles = () => {
  const viewBtns = document.querySelectorAll(".calView");
  Object.keys(viewBtns).forEach(key => (viewBtns[key].style = ""));
};

const styleCurrentBtn = event => {
  cleanBtnStyles();
  const el = event.target;
  const btn = el.matches("span") ? el.parentElement.style : el.style;
  btn.color = currentBtnStyle.color;
  btn.fontWeight = currentBtnStyle.fontWeight;
};

const handleOnClick = clickFunc => event => {
  styleCurrentBtn(event);
  clickFunc();
};

const HeaderViewComponent = props => {
  const {
    onClickViewButton,
    pairedRooms,
    roomList,
    selectedRooms,
    selectedRoom,
    isSingleGrid,
    onChangeRoomSelect,
    headerDateContainer,
    classes: styleClasses
  } = props;

  const {
    createBtnContainer,
    createButton,
    optionBar,
    optionButtons,
    rightBtn,
    middleBtn,
    leftBtn
  } = styleClasses;

  const { DAY, WEEK, MONTH } = CalendarViewSelectors;

  return (
    <div>
      <div>{headerDateContainer}</div>
      <div>
        <SelectRoom
          pairedRooms={pairedRooms}
          roomList={roomList}
          selectedRooms={selectedRooms}
          selectedRoom={selectedRoom}
          isSingleGrid={isSingleGrid}
          onChangeRoomSelect={onChangeRoomSelect}
        />
      </div>
      <div className={createBtnContainer}>
        <ModalFormConsumer>
          {modalForm => (
            <Button
              color="primary"
              className={createButton}
              onClick={modalForm.handleOnClickCreateMeeting}
              variant={"contained"}
            >
              CREATE APPOINTMENT
            </Button>
          )}
        </ModalFormConsumer>
      </div>
      <div className={optionBar}>
        <div className={optionButtons}>
          <Button
            className={classNames(leftBtn, "calView")}
            onClick={handleOnClick(onClickViewButton(DAY))}
            variant={"contained"}
            style={currentBtnStyle}
          >
            Day
          </Button>
          <Button
            className={classNames(middleBtn, "calView")}
            onClick={handleOnClick(onClickViewButton(WEEK))}
            variant={"contained"}
          >
            Week
          </Button>
          <Button
            className={classNames(rightBtn, "calView")}
            onClick={handleOnClick(onClickViewButton(MONTH))}
            variant={"contained"}
          >
            Month
          </Button>
        </div>
      </div>
    </div>
  );
};

export const HeaderView = withStyles(styles)(HeaderViewComponent);
