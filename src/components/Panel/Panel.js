import React from "react";

import { Frame } from "../Frame/Frame";

import classes from "./Panel.module.css";

export const Panel = (props) => {
  return (
    <Frame styles={`${classes.Panel} ${props.styles}`}>{props.children}</Frame>
  );
};