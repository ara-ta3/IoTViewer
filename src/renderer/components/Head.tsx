import * as React from "react";
import { Device } from "../../Contract";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

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
  React.useEffect(() => {
    if (props.name !== "") {
      props.fetchDevices(props.name);
    }
  }, [props.name]);
  React.useEffect(props.fetchIp, [props.ip]);
  const nStep = props.name === "" ? 0 : 1;

  return (
    <Box my={2}>
      <StepView nStep={nStep} />
      <Box sx={{ width: "100%", textAlign: "center" }} my={2}>
        <RegisterButton name={props.name} register={props.registerApp} />
        <FetchButton name={props.name} fetchDevices={props.fetchDevices} />
      </Box>
    </Box>
  );
};

const StepView: React.FC<{
  nStep: number;
}> = ({ nStep }) => {
  return (
    <Box sx={{ width: "50%", height: "100%", mx: "auto" }} my={2}>
      <Stepper activeStep={nStep} alternativeLabel>
        <Step key={1}>
          <StepLabel>
            Push Hue Bridge And Click register button to your Hue Bridge
          </StepLabel>
        </Step>
        <Step key={2}>
          <StepLabel>Application Registered</StepLabel>
        </Step>
      </Stepper>
    </Box>
  );
};

const RegisterButton: React.FC<{
  name: string;
  register: () => any;
}> = ({ name, register }) => {
  if (name !== "") {
    return <div />;
  }
  return (
    <Button variant="outlined" color="primary" onClick={() => register()}>
      Register Application
    </Button>
  );
};

const FetchButton: React.FC<{
  name: string;
  fetchDevices: (name: string) => any;
}> = ({ name, fetchDevices }) => {
  return name.length === 0 ? (
    <div />
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
