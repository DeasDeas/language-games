import React, { useState } from "react";
import { Header } from "../../components/Header";
import { Box } from "@material-ui/core";
import classes from "./styles.module.css";
import { Footer } from "../../components/Footer";
import { paths } from "../../vars/paths";
import { useSelector } from "react-redux";
import {
  AnimationContext,
  defaultAnimationContextValue,
} from "../contexts/AnimationContext";
import { ANIMATION_SPEED } from "../../vars/consts";

export const TemplatePage = (props) => {
  const headerItems = [
      { name: "home", path: "/" },
      { name: "games", path: paths.gamesPage },
    ],
    headerProps = {
      menuLinks: headerItems,
      user: useSelector((state) => state.auth.user),
    };

  const [animationContext, setAnimationContext] = useState({
    animationContextValue: {
      ...defaultAnimationContextValue,
      toggleAnimation: defaultAnimationContextValue.toggleAnimation(
        ANIMATION_SPEED.QUICK
      ),
    },
    setAnimationContext: () => {},
  });

  return (
    <AnimationContext.Provider
      value={{
        ...animationContext,
        setAnimationContext: setAnimationContext,
      }}
    >
      <Box>
        <Header {...headerProps} />
        <main className={`${classes.outerWrapper} background_secondary`}>
          <Box className={`${classes.innerWrapper}`}>{props.children}</Box>
        </main>
        <Footer />
      </Box>
    </AnimationContext.Provider>
  );
};