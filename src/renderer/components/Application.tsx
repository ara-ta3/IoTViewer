import { makeStyles, Paper, Theme } from "@material-ui/core";
import * as React from "react";
import { Head } from "./Head";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

export const Application: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Head headline="Hello World" />
    </Paper>
  );
};
