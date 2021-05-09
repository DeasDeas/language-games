import React from "react";
import classes from "./styles.module.css";
import Box from "@material-ui/core/Box";

export const Frame = (props) => {
  return (
    <Box
      className={props.className ? props.className : classes.Frame}
    >
      {props.children}
    </Box>
  );
};