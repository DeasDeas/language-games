import React from "react";
import { Box } from "@material-ui/core";
import classes from "./styles.module.css";
import Typography from "@material-ui/core/Typography";

export const Message = (props) => {
  const type = props.type || "default",
    classNames = `${classes.messageBox} ${classes["messageBox__" + type]}`;

  return props.children ? (
    <>
      {props.children.map((message) => (
        <Box className={classNames}>
          <Typography variant="h6" component="p">
            {message}
          </Typography>
        </Box>
      ))}
    </>
  ) : (
    <></>
  );
};