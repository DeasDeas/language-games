import React, { useEffect, useRef, useState } from "react";
import classes from "../Auth.module.css";
import { AuthButton } from "../AuthButton/AuthButton";
import { useHistory } from "react-router-dom";
import { authenticateUser, getUser } from "../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

export const AuthLogIn = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const username = useRef(null);
  const password = useRef(null);
  const [redOutline, setRedOutline] = useState("");

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
          password.current.value = '';
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
