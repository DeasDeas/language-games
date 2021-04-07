import React, { createRef } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { registerUser } from "../../../features/auth";

import { Form } from "../../Form";
import { Button } from "../../../mui/themes";

export const AuthRegister = () => {
  let history = useHistory();
  const username = createRef();
  const password = createRef();
  const confirmPassword = createRef();
  const email = createRef();
  const dispatch = useDispatch();

  const registerForm = {
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
      "password-confirm": {
        id: "password-confirm",
        type: "password",
        ref: confirmPassword,
        label: "confirm password",
        required: true,
      },
      "e-mail": {
        id: "email",
        type: "email",
        ref: email,
        label: "e-mail",
        required: true,
      },
    },
    allIds: ["login", "e-mail", "password", "password-confirm"],
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(
        registerUser({
          username: username.current.value,
          password1: password.current.value,
          password2: confirmPassword.current.value,
          email: email.current.value,
        })
      );
      unwrapResult(resultAction);
      history.push("/");
    } catch (err) {
      password.current.value = "";
      confirmPassword.current.value = "";
    }
  };

  return (
    <form
      method="post"
      name="register"
      onSubmit={(e) => submitHandler(e)}
    >
      <Form form={registerForm}>
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </Form>
    </form>
  );
};