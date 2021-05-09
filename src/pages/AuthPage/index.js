import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { paths } from "../../vars/paths";
import { AuthSelection } from "../../components/Auth/AuthSelection";
import { AuthRegister } from "../../components/Auth/AuthRegister";
import { AuthLogIn } from "../../components/Auth/AuthLogIn";
import classes from "./styles.module.css";
import { AnimationContext } from "../contexts/AnimationContext";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/selectors";

export const AuthPage = (props) => {
  const { url } = useRouteMatch(),
    user = useSelector(selectCurrentUser);

  return (
    <AnimationContext.Consumer>
      {(contextValue) => {
        const { toggleAnimation } = contextValue.animationContextValue;

        return (
          <Box className="templateC">
            <section className={classes.authPage}>
              <Switch>
                {!user.id ? (
                  <>
                    <Route exact path={paths.auth}>
                      <AuthSelection toggleAnimation={toggleAnimation} />
                    </Route>
                    <Route path={`${url}${paths.register}`}>
                      <AuthRegister toggleAnimation={toggleAnimation} />
                    </Route>
                    <Route path={`${url}${paths.login}`}>
                      <AuthLogIn toggleAnimation={toggleAnimation} />
                    </Route>
                  </>
                ) : (
                  <Redirect to={"/"} />
                )}
              </Switch>
            </section>
          </Box>
        );
      }}
    </AnimationContext.Consumer>
  );
};