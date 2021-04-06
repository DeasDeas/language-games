import React from "react";

import Paper from "@material-ui/core/Paper";
import classes from "./styles.module.css";

export const Index = (props) => {
  return (
    <Paper variant={"outlined"} className={`${classes.Panel} ${props.styles}`}>
      {props.children}
    </Paper>
  );
};