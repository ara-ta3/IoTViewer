import * as React from "react";
import { Device } from "../../Contract";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Switch, Typography } from "@material-ui/core";

export interface HueProps {
  ip: string;
  userName: string;
  devices: Device[];
  updateDevice: (
    endpoint: string,
    userName: string,
    deviceId: number,
    on: boolean
  ) => any;
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  grid: {
    flexGrow: 1,
  },
  type: {
    fontSize: 14,
  },
});

export const HueDevices: React.FC<HueProps> = (props: HueProps) => {
  const classes = useStyles();
  const devices = props.devices.map((d) => (
    <Grid item xs={4}>
      <HueCard
        device={d}
        updateDevice={(deviceId, on) =>
          props.updateDevice(`http://${props.ip}`, props.userName, deviceId, on)
        }
      />
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

export const HueCard: React.FC<{
  device: Device;
  updateDevice: (deviceId: number, on: boolean) => any;
}> = (props: {
  device: Device;
  updateDevice: (deviceId: number, on: boolean) => any;
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.type} color="textSecondary" gutterBottom>
          {props.device.type}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.device.name}
        </Typography>
        <Typography color="textSecondary">
          {props.device.productName}
        </Typography>
        <Switch
          checked={props.device.state.on}
          color="primary"
          name="Switch"
          onChange={() =>
            props.updateDevice(props.device.id, !props.device.state.on)
          }
        />
      </CardContent>
    </Card>
  );
};
