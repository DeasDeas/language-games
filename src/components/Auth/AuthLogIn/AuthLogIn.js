import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { AuthButton } from "../AuthButton/AuthButton";
import { authenticateUser, getUser } from "../../../features/auth/authSlice";

import classes from "../Auth.module.css";

export const AuthLogIn = () => {
  const [redOutline, setRedOutline] = useState("");
  const dispatch = useDispatch();
  const username = useRef(null);
  const password = useRef(null);
  const history = useHistory();

  return (
    <form
      className={classes.Frame}
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const resultAction = await dispatch(
            authenticateUser({
              username: username.current.value,
              password: password.current.value,
            })
          );
          unwrapResult(resultAction);
          history.push("/");
          dispatch(getUser());
        } catch (err) {
          password.current.value = "";
          setRedOutline(classes.redOutline);
        }
      }}
    >
      <div className={classes.FormContent}>
        <div className={classes.input}>
          <span>Login</span>
          <input
            className={redOutline}
            type="text"
            onChange={(e) => {
              e.target.className = "";
            }}
            ref={username}
            required
          />
        </div>
        <div className={classes.input}>
          <span>Password</span>
          <input
            className={redOutline}
            type="password"
            ref={password}
            onChange={(e) => {
              e.target.className = "";
            }}
            required
            autoComplete="on"
          />
        </div>
        <AuthButton
          styleClasses={`${classes.SingInButton} ${classes.stretchButton}`}
          value="submit"
        >
          Apply
        </AuthButton>
      </div>
    </form>
  );
};
