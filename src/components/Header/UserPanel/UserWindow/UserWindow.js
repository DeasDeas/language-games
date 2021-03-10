import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { logout } from "../../../../features/auth/authSlice";

import classes from "./UserWindow.module.css";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import {capitalize} from "@material-ui/core";

export const UserWindow = () => {
  const username = useSelector((state) => state.auth.user.username);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Box className={classes.userWrapper}>
      <Avatar className={classes.avatar} src="" ></Avatar>
      <Typography className={classes.username} variant="h4" component="h6">
        {!!username && capitalize(username)}
      </Typography>
      <Link
        onClick={async () => {
          await dispatch(logout());
          history.push("/");
          window.location.reload();
        }}
        variant="body1"
        color="secondary"
        className={classes.logout}
      >
        logout
      </Link>
    </Box>
  );
};
