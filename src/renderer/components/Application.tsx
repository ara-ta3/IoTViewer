import { Paper } from "@mui/material";
import * as React from "react";
import HeadContainer from "../containers/HeadContainer";
import HueContainer from "../containers/HueContainer";

export const Application: React.FC = () => {
  return (
    <Paper sx={{ py: 2 }}>
      <HeadContainer />
      <HueContainer />
    </Paper>
  );
};
