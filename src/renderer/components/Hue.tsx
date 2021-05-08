import * as React from "react";
import { Device } from "../../Contract";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Grid,
  Slider,
  Switch,
  Typography,
} from "@material-ui/core";
import { UpdateHueStateRequest } from "../../HueGateway";

export interface HueProps {
  ip: string;
  userName: string;
  devices: Device[];
  updateDevice: (
    endpoint: string,
    userName: string,
    deviceId: number,
    req: UpdateHueStateRequest
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
        updateDevice={(deviceId, req: UpdateHueStateRequest) =>
          props.updateDevice(
            `http://${props.ip}`,
            props.userName,
            deviceId,
            req
          )
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
  updateDevice: (deviceId: number, req: UpdateHueStateRequest) => any;
}> = (props: {
  device: Device;
  updateDevice: (deviceId: number, req: UpdateHueStateRequest) => any;
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
            props.updateDevice(props.device.id, {
              on: !props.device.state.on,
            })
          }
        />
        <Slider
          defaultValue={props.device.state.bri}
          valueLabelDisplay="auto"
          min={1}
          max={254}
        />
      </CardContent>
    </Card>
  );
};
