import React, { createRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "../../Form";
import { Button } from "../../../mui/themes";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import { LOADING_STATE } from "../../../vars/consts";
import { Proceed } from "../../Proceed";
import { Message } from "../../Message";
import { login as loginRequest } from "../../../api/auth";
import { setCurrentUser } from "../../../features/auth";

export const AuthLogIn = (props) => {
  const dispatch = useDispatch(),
    usernameRef = createRef(),
    passwordRef = createRef(),
    [animate, setAnimate] = useState(false),
    [animateMessage, setAnimateMessage] = useState(false),
    { toggleAnimation } = props,
    [message, setMessage] = useState({ texts: [""], type: "default", status: 0 }),
    [loadingState, setLoadingState] = useState(LOADING_STATE.IDLE);

  useEffect(() => {
    !animate && toggleAnimation(setAnimate)();
  }, []);

  const loginForm = {
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
    },
    allIds: ["login", "password"],
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoadingState(LOADING_STATE.PENDING);

    const loginData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: "",
    };
    const { data, message } = await loginRequest(loginData);

    message.status === 200 ?
    (dispatch(setCurrentUser(data)) &&
      setLoadingState(LOADING_STATE.FULFILLED)) : setLoadingState(LOADING_STATE.REJECTED);

    toggleAnimation(setAnimateMessage)(() => setMessage(message));
  };

  return (
    <>
      {loadingState === LOADING_STATE.PENDING && <Proceed />}
      <Fade in={animate}>
        <form onSubmit={submitHandler}>
          <Form form={loginForm}>
            <Button variant="contained" color="primary" type="submit">
              Login
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