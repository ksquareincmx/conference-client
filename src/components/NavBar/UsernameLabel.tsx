import React from "react";
import { Typography } from "@material-ui/core/";

import { useStyles } from "hooks/useStyles";

const styles = {
  label: {
    color: "white",
    fontFamily: "Verdana, Geneva, sans-serif",
    fontSize: 20
  }
};

export interface IUsernameLabel {
  username: string;
}

export const UsernameLabel: React.FC<IUsernameLabel> = ({ username }) => {
  const { label } = useStyles(styles);
  return <Typography className={label}>{username}</Typography>;
};
