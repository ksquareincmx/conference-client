import React from "react";
import { Radio, FormControlLabel } from "@material-ui/core";
import { WithStyles, createStyles, withStyles } from "@material-ui/core";

import { useStyles } from "hooks/useStyles";
import { string, any } from "prop-types";

const styles = createStyles({
  timeSelector: {},
  checked: {
    color: "#0000FF"
  }
});

interface IBook {
  startTime: {
    hour: string;
    minute: string;
  };
  endTime: {
    hour: string;
    minute: string;
  };
  conferenceRoom: string;
  reason: string;
  selected: boolean;
}
interface IRecBookingProps extends WithStyles<typeof styles> {
  booking: IBook;
}

const RecurrentBooking: React.SFC<IRecBookingProps> = ({ booking }) => {
  const handleClick: Function = (option: string) => {
    console.log("clikeed radio", option);
  };
  const clasess = useStyles(styles);
  return (
    <FormControlLabel
      label={booking.reason}
      control={
        <Radio name="recurrent booking selector" value={booking.reason} />
      }
    />
  );
};

export default RecurrentBooking;
