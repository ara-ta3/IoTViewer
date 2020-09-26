import * as React from "react";
import { TextField, Typography } from "@material-ui/core";

export interface HeadProps {
  name: string;
  updateName: (name: string) => any;
}

export const Head: React.FC<HeadProps> = (props: HeadProps) => {
  return (
    <div>
      <Typography variant="h6" component="h3">
        Hue Device Manager
      </Typography>
      <TextField
        label="UserName"
        fullWidth={true}
        onChange={(e) => props.updateName(e.target.value)}
      />
    </div>
  );
};
