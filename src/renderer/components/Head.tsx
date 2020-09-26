import * as React from "react";
import { Typography } from "@material-ui/core";

export interface HeadProps {
  headline: string;
}

export const Head: React.FC<HeadProps> = ({ headline }) => {
  return (
    <Typography variant="h3" component="h1">
      {headline}
    </Typography>
  );
};
