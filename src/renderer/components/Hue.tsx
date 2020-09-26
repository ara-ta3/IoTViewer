import * as React from "react";
import { Device } from "../../Contract";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Switch, Typography } from "@material-ui/core";

export interface HueProps {
  devices: Device[];
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  grid: {
    flexGrow: 1,
  },
});

export const HueDevices: React.FC<HueProps> = (props: HueProps) => {
  const classes = useStyles();
  const devices = props.devices.map((d) => (
    <Grid item xs={4}>
      <HueCard device={d} />
    </Grid>
  ));

  return (
    <div className={classes.grid}>
      <Grid container spacing={3}>
        {devices}
      </Grid>
    </div>
  );
};

export const HueCard: React.FC<{ device: Device }> = (props: {
  device: Device;
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.device.name}
        </Typography>

        <Switch checked={props.device.state.on} color="primary" name="Switch" />
      </CardContent>
    </Card>
  );
};
