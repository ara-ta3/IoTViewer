import * as React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Device } from "../../Contract";

export interface HeadProps {
  name: string;
  ip: string;
  devices: Device[] | null;
  userNameDescription: string;
  registerApp: () => any;
  fetchIp: () => any;
  fetchDevices: (name: string) => any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4, 0),
  },
  base: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export const Head: React.FC<HeadProps> = (props: HeadProps) => {
  const s = useStyles();
  React.useEffect(() => {
    if (props.name !== "") {
      props.fetchDevices(props.name);
    }
  }, [props.name]);
  React.useEffect(props.fetchIp, [props.ip]);

  return (
    <div className={s.root}>
      <Box className={s.base}>
        <Typography variant="h6" component="h3">
          Hue Device Manager
        </Typography>
        <Typography variant="h6" component="h3">
          IP Address: {props.ip}
        </Typography>
        <Typography variant="h6" component="h3">
          User Name: {props.name}
        </Typography>
        <Typography variant="subtitle1" component="h3" color={"error"}>
          {props.userNameDescription}
        </Typography>
      </Box>
      <Box className={s.base}>
        <RegisterButton register={props.registerApp} />
        <FetchButton
          ip={props.ip}
          name={props.name}
          fetchDevices={props.fetchDevices}
        />
      </Box>
    </div>
  );
};

const RegisterButton: React.FC<{
  register: () => any;
}> = ({ register }) => {
  return (
    <Button variant="contained" color="primary" onClick={() => register()}>
      Register Application
    </Button>
  );
};

const FetchButton: React.FC<{
  name: string;
  ip: string;
  fetchDevices: (name: string) => any;
}> = ({ name, ip, fetchDevices }) => {
  return name.length === 0 ? (
    <Button variant="contained" color="primary" disabled>
      Fetch Devices
    </Button>
  ) : (
    <Button
      variant="contained"
      color="primary"
      onClick={() => fetchDevices(name)}
    >
      Fetch Devices
    </Button>
  );
};
