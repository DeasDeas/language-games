import React from "react";
import { Paper } from "@material-ui/core";
import classes from "./styles.module.css";

export const Frame = (props) => {
  return (
    <Paper
      className={props.className ? props.className : classes.Frame}
      elevation={3}
    >
      {props.children}
    </Paper>
  );
};