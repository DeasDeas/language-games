import React from "react";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import { UserWindow } from "./UserWindow/UserWindow";

import classes from "./UserPanel.module.css";
import { Button } from "../../../mui/themes";

export const UserPanel = (props) => {
  const isInAuth = /\/auth/.test(props.currentRoute.pathname);
  const isAuthenticated = useSelector((state) => state.auth.authenticated);

  return (
    <div className={classes.UserPanel}>
      {!isInAuth && !isAuthenticated && (
        <NavLink to={"/auth"}>
          <Button variant="contained" color="green">
            log in
          </Button>
        </NavLink>
      )}
      {isAuthenticated && <UserWindow />}
    </div>
  );
};
