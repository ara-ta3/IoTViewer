import * as React from "react";
import { Device } from "../../Contract";
import {
  Card,
  CardContent,
  Grid,
  Slider,
  Switch,
  Typography,
} from "@mui/material";
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

export const HueDevices: React.FC<HueProps> = (props: HueProps) => {
  const devices = props.devices.map((d) => (
    <Grid item xs={4} key={d.id}>
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
    <Grid container spacing={3}>
      {devices}
    </Grid>
  );
};

export const HueCard: React.FC<{
  device: Device;
  updateDevice: (deviceId: number, req: UpdateHueStateRequest) => any;
}> = (props: {
  device: Device;
  updateDevice: (deviceId: number, req: UpdateHueStateRequest) => any;
}) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
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
            // FIXME Domainにstate -> requestの関数用意して、ここで変換するかなやんだけど、なんか設計が違う気がしたのでまた今度考えたい
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
          onChange={(_, v) => {
            if (typeof v === "number") {
              props.updateDevice(props.device.id, {
                bri: v,
              });
            }
          }}
        />
      </CardContent>
    </Card>
  );
};
