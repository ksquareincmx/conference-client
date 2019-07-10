import { makeStyles, createStyles } from "@material-ui/core";
import { StyleRules } from "@material-ui/styles/withStyles";

export const useStyles = (style: StyleRules) => {
  const initHook = makeStyles(() => createStyles(style));
  return initHook();
};
