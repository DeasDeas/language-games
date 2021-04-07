import React, { createRef } from "react";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { authenticateUser, getUser } from "../../../features/auth";

import { Form } from "../../Form";
import { Button } from "../../../mui/themes";


export const AuthLogIn = () => {
  const dispatch = useDispatch();
  const username = createRef();
  const password = createRef();
  const history = useHistory();

  const loginForm = {
    byId: {
      login: {
        id: "login",
        ref: username,
        label: "login",
        required: true,
      },
      password: {
        id: "password",
        type: "password",
        ref: password,
        label: "password",
        required: true,
      },
    },
    allIds: ["login", "password"],
  };

  const submitHandler = async (e) => {
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
    } catch (err) {}
  };

  return (
    <form onSubmit={submitHandler}>
      <Form form={loginForm}>
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </Form>
    </form>
  );
};