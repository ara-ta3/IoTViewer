import * as React from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Device } from "../../Contract";

export interface HeadProps {
  name: string;
  ip: string;
  devices: Device[] | null;
  updateName: (name: string) => any;
  fetchIP: () => any;
  fetchDevices: (ip: string, name: string) => any;
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
      </Box>
      <Box className={s.base}>
        <FetchIPButton fetchIP={props.fetchIP} />
        <RegisterButton ip={props.ip} register={() => {}} />
        <FetchButton
          ip={props.ip}
          name={props.name}
          fetchDevices={props.fetchDevices}
        />
      </Box>
    </div>
  );
};

const FetchIPButton: React.FC<{ fetchIP: () => any }> = ({ fetchIP }) => {
  return (
    <Button variant="contained" color="primary" onClick={fetchIP}>
      Fetch IP
    </Button>
  );
};

const RegisterButton: React.FC<{
  ip: string;
  register: (ip: string) => any;
}> = ({ ip, register }) => {
  return (
    <Button variant="contained" color="primary" onClick={() => register(ip)}>
      Register Application
    </Button>
  );
};

const FetchButton: React.FC<{
  name: string;
  ip: string;
  fetchDevices: (ip: string, name: string) => any;
}> = ({ name, ip, fetchDevices }) => {
  return name.length === 0 || ip.length === 0 ? (
    <Button variant="contained" color="primary" disabled>
      Fetch Devices
    </Button>
  ) : (
    <Button
      variant="contained"
      color="primary"
      onClick={() => fetchDevices(ip, name)}
    >
      Fetch Devices
    </Button>
  );
};
