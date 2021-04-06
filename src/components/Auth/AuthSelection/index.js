import React from "react";
import { NavLink } from "react-router-dom";

import classes from "../styles.module.css";
import { Button } from "../../../mui/themes";
import {Frame} from "../../Frame";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export const AuthSelection = () => {
  return (
    <Frame>
      <Box className={classes.textWrapper}>
        <Typography variant="subtitle1" component="p">Войдите в систему или зарегистрируйтесь:</Typography>
      </Box>
      <Box>
        <NavLink className={classes.buttonWrapper} to="/auth/login">
          <Button variant="contained" color="green">
            Log In
          </Button>
        </NavLink>
        <NavLink className={classes.buttonWrapper} to="/auth/register">
          <Button variant="contained" color="secondary">
            Register
          </Button>
        </NavLink>
      </Box>
    </Frame>
  );
};