import React, {useRef, useState} from "react";
import classes from "../Auth.module.css";
import { AuthButton } from "../AuthButton/AuthButton";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../../features/auth/authSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

export const AuthRegister = () => {
  let history = useHistory();
  const username = useRef(null);
  const password1 = useRef(null);
  const password2 = useRef(null);
  const email = useRef(null);
  const [redOutline, setRedOutline] = useState("");
  const dispatch = useDispatch();

  return (
    <form
      method="post"
      name="register"
      className={classes.Frame}
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          const resultAction = await dispatch(
            registerUser({
              username: username.current.value,
              password1: password1.current.value,
              password2: password2.current.value,
              email: email.current.value,
            })
          );
          unwrapResult(resultAction);
          history.push("/");
        } catch (err) {
          password1.current.value = '';
          password2.current.value = '';
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
          <span>E-mail</span>
          <input
            className={redOutline}
            type="email"
            onChange={(e) => {
              e.target.className = "";
            }}
            ref={email}
            required
          />
        </div>
        <div className={classes.input}>
          <span>Password</span>
          <input
            className={redOutline}
            type="password"
            onChange={(e) => {
              e.target.className = "";
            }}
            ref={password1}
            required
            autoComplete="on"
          />
        </div>
        <div className={classes.input}>
          <span>
            Confirm
            <br />
            password
          </span>
          <input
            className={redOutline}
            type="password"
            onChange={(e) => {
              e.target.className = "";
            }}
            ref={password2}
            required
            autoComplete="on"
          />
        </div>
        <AuthButton styleClasses={classes.stretchButton} value="submit">
          Apply
        </AuthButton>
      </div>
    </form>
  );
};
