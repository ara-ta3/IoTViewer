import * as React from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export interface HeadProps {
  name: string;
  updateName: (name: string) => any;
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
          label="UserName"
          fullWidth={true}
          onChange={(e) => props.updateName(e.target.value)}
        />
      </Box>
      <Box>
        <FetchButton name={props.name} />
      </Box>
    </div>
  );
};

const FetchButton: React.FC<{ name: string }> = ({ name }) => {
  return name.length === 0 ? (
    <Button variant="contained" color="primary" disabled>
      Fetch Devices
    </Button>
  ) : (
    <Button variant="contained" color="primary">
      Fetch Devices
    </Button>
  );
};
