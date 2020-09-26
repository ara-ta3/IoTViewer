import { makeStyles, Paper, Theme } from "@material-ui/core";
import * as React from "react";
import HeadContainer from "../containers/HeadContainer";
import HueContainer from "../containers/HueContainer";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

export const Application: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <HeadContainer />
      <HueContainer />
    </Paper>
  );
};
