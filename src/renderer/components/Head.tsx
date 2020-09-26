import * as React from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export interface HeadProps {
  name: string;
  ip: string;
  updateName: (name: string) => any;
  updateIP: (ip: string) => any;
}

const useStyles = makeStyles((theme) => ({
  base: {
    margin: theme.spacing(4, 0),
  },
}));

export const Head: React.FC<HeadProps> = (props: HeadProps) => {
  const s = useStyles();
  return (
    <div>
      <Box className={s.base}>
        <Typography variant="h6" component="h3">
          Hue Device Manager
        </Typography>
        <TextField
          label="IP Address of Hue Device"
          fullWidth={true}
          onChange={(e) => props.updateIP(e.target.value)}
        />
        <TextField
          label="UserName"
          fullWidth={true}
          onChange={(e) => props.updateName(e.target.value)}
        />
      </Box>
      <Box>
        <FetchButton name={props.name} ip={props.ip} />
      </Box>
    </div>
  );
};

const FetchButton: React.FC<{ name: string; ip: string }> = ({ name, ip }) => {
  return name.length === 0 || ip.length === 0 ? (
    <Button variant="contained" color="primary" disabled>
      Fetch Devices
    </Button>
  ) : (
    <Button variant="contained" color="primary">
      Fetch Devices
    </Button>
  );
};
