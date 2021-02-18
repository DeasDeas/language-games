import React from "react";
import { Frame } from "../../Frame/Frame";
import classes from "./MainMenuFrame.module.css";

export const MainMenuFrame = (props) => {
  return <Frame styles={classes.MainMenuFrame}>{props.children}</Frame>;
};