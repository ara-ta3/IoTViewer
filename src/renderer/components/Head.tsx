import * as React from "react";
import { Device } from "../../Contract";
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

export interface HeadProps {
  name: string;
  ip: string;
  devices: Device[] | null;
  userNameDescription: string;
  registerApp: () => any;
  fetchIp: () => any;
  fetchDevices: (name: string) => any;
}

export const Head: React.FC<HeadProps> = (props: HeadProps) => {
  React.useEffect(props.fetchIp, [props.ip]);
  const nStep = props.name === "" ? 0 : 1;

  return (
    <Box my={2}>
      <StepView nStep={nStep} error={props.userNameDescription} />
      <Box sx={{ width: "100%", textAlign: "center" }} my={2}>
        <ActionButton {...props} />
      </Box>
    </Box>
  );
};

const StepView: React.FC<{
  nStep: number;
  error: string;
}> = ({ nStep, error }) => {
  let FirstLabel = (
    <StepLabel>
      Push Hue Bridge and click REGISTER APPLICATION to register to your Hue
      Bridge
    </StepLabel>
  );

  if (error.length > 0) {
    const ErrorMessage = (
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
    FirstLabel = (
      <StepLabel optional={ErrorMessage} error={true}>
        Push Hue Bridge and click REGISTER APPLICATION to register to your Hue
        Bridge
      </StepLabel>
    );
  }
  return (
    <Box sx={{ width: "80%", height: "100%", mx: "auto" }} my={2}>
      <Stepper activeStep={nStep} alternativeLabel>
        <Step key={1}>{FirstLabel}</Step>
      </Stepper>
    </Box>
  );
};

const ActionButton: React.FC<{
  name: string;
  registerApp: () => any;
  fetchDevices: (name: string) => any;
}> = ({ name, registerApp, fetchDevices }) => {
  if (name.length > 0) {
    return (
      <Button
        variant="outlined"
        color="primary"
        onClick={() => fetchDevices(name)}
      >
        Fetch Devices
      </Button>
    );
  }
  return (
    <Button variant="outlined" color="primary" onClick={() => registerApp()}>
      Register Application
    </Button>
  );
};
