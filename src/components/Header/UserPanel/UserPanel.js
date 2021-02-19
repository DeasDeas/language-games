import React from "react";
import classes from "./UserPanel.module.css";
import { NavLink } from "react-router-dom";
import { LogInButton } from "./LogInButton/LogInButton";
import { UserWindow } from "./UserWindow/UserWindow";
import { HomeButton } from "./HomeButton/HomeButton";
import { useSelector } from "react-redux";

export const UserPanel = (props) => {
  const isInAuth = /\/auth/.test(props.currentRoute.pathname);
  const isAuthenticated = useSelector((state) => state.auth.authenticated);

  return (
    <div className={classes.UserPanel}>
      {!isInAuth && !isAuthenticated && (
        <NavLink to={"/auth"}>
          <LogInButton />
        </NavLink>
      )}
      {isAuthenticated && <UserWindow />}
    </div>
  );
};