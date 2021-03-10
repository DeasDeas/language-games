import React from "react";
import { NavLink } from "react-router-dom";

import classes from "../Auth.module.css";
import Paper from "@material-ui/core/Paper";
import { Button } from "../../../mui/themes";

export const AuthSelection = () => {
  return (
    <Paper className={classes.Frame} elevation={3}>
      <div className={classes.textWrapper}>
        <p>Войдите в систему или зарегистрируйтесь:</p>
      </div>
      <div>
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
      </div>
    </Paper>
  );
};