import * as React from "react";
import { Device, Group } from "../../Contract";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Slider,
  Switch,
  Typography,
} from "@mui/material";
import { UpdateHueStateRequest } from "../../HueGateway";

export interface HueProps {
  ip: string;
  userName: string;
  devices: Device[] | null;
  groups: Group[] | null;
  updateDevice: (
    endpoint: string,
    userName: string,
    deviceId: number,
    req: UpdateHueStateRequest
  ) => any;
  fetchDevices: (name: string) => any;
  fetchGroups: (name: string) => any;
}

export const HueDevices: React.FC<HueProps> = (props: HueProps) => {
  React.useEffect(
    () => props.userName !== "" && props.fetchDevices(props.userName),
    [props.userName]
  );
  React.useEffect(
    () => props.userName !== "" && props.fetchGroups(props.userName),
    [props.userName]
  );
  const devices = props.devices;
  const groups = props.groups;

  if (devices === null || groups === null) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  const ds = devices.map((d) => (
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

  const gs = groups.map((g, i) => (
    <Grid item xs={12} key={i}>
      <GroupCard group={g} devices={devices} />
    </Grid>
  ));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {gs}
      </Grid>
    </Box>
  );
};

const GroupCard: React.FC<{
  group: Group;
  devices: Device[];
}> = (props: { group: Group; devices: Device[] }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.group.name}
        </Typography>
      </CardContent>
    </Card>
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
    <Card variant="outlined">
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
