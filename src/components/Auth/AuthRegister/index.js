import React, { createRef, useState } from "react";

import { Form } from "../../Form";
import { Button } from "../../../mui/themes";
import Fade from "@material-ui/core/Fade";
import { LOADING_STATE } from "../../../vars/consts";
import Box from "@material-ui/core/Box";
import { Message } from "../../Message";
import {register} from "../../../api/auth";

export const AuthRegister = (props) => {
  const usernameRef = createRef(),
    passwordRef = createRef(),
    confirmPasswordRef = createRef(),
    emailRef = createRef(),
    [animate, setAnimate] = useState(false),
    [animateMessage, setAnimateMessage] = useState(false),
    { toggleAnimation } = props,
    [message, setMessage] = useState({ texts: [""], type: "default", status: 0 }),
    [loadingState, setLoadingState] = useState(LOADING_STATE.IDLE);

  React.useEffect(() => {
    !animate && props.toggleAnimation(setAnimate)();
  }, [animate]);

  const registerForm = {
    byIds: {
      login: {
        id: "login",
        ref: usernameRef,
        label: "login",
        required: true,
      },
      password: {
        id: "password",
        type: "password",
        ref: passwordRef,
        label: "password",
        required: true,
      },
      "password-confirm": {
        id: "password-confirm",
        type: "password",
        ref: confirmPasswordRef,
        label: "confirm password",
        required: true,
      },
      "e-mail": {
        id: "email",
        type: "email",
        ref: emailRef,
        label: "e-mail",
        required: true,
      },
    },
    allIds: ["login", "e-mail", "password", "password-confirm"],
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoadingState(LOADING_STATE.PENDING);

    const registerData = {
      username: usernameRef.current.value,
      password1: passwordRef.current.value,
      password2: confirmPasswordRef.current.value,
      email: emailRef.current.value,
    };

    const { message } = await register(registerData);
    if (message.status !== 200) {
      e.target[4].value = null;
      e.target[6].value = null;
    }


    toggleAnimation(setAnimateMessage)(() => setMessage(message));
  };

  return (
    <>
      <Fade in={animate}>
        <form method="post" name="register" onSubmit={(e) => submitHandler(e)}>
          <Form form={registerForm}>
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
          </Form>
        </form>
      </Fade>
      <Fade in={animateMessage}>
        <Box>
          <Message type={message.type}>{message.texts}</Message>
        </Box>
      </Fade>
    </>
  );
};
