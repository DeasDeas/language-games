import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import "../../styles.css";
import classes from "./styles.module.css";
import Typography from "@material-ui/core/Typography";
import { Button } from "../../../mui/themes";
import { PAGE_STATE } from "../../../vars/consts";
import { Game } from "../../../containers/Game";
import { Proceed } from "../../../components/Proceed";
import { Constructor } from "../../../containers/Game/Constructor";
import Fade from "@material-ui/core/Fade";
import { useDispatch, useSelector } from "react-redux";
import { selectedCurrentUser } from "../../../features/auth/selectors";
import { AnimationContext, animations } from "./AnimationContext";
import { selectPageState } from "../../../features/pageState/selectors";
import { setPageState } from "../../../features/pageState";

export const GameItemPage = ({ item }) => {
  const currentUser = useSelector(selectedCurrentUser),
    canAccessControls = currentUser.id === item.ownerId,
    dispatch = useDispatch(),
    [gameState, setGameState] = [
      useSelector(selectPageState),
      (pageState) =>
        dispatch(setPageState({ newState: pageState })),
    ],
    [animate, setAnimate] = useState(true);

  const animationPrefs = {
    toggleMainPageAnimation: animations.toggleAnimation(250)(setAnimate),
    toggleAnimation: animations.toggleAnimation(250),
  };

  const handleStartGame = () => {
    animationPrefs.toggleMainPageAnimation(    () => {
      setGameState(PAGE_STATE.LOADING);
      setTimeout(() => {
        setGameState(PAGE_STATE.RUNNING)
      }, 500)});
  };

  const clickBackHandler = () => {
    setGameState(PAGE_STATE.PREPARING);
  };

  return (
    <AnimationContext.Provider value={animationPrefs}>
      <Fade in={animate}>
        <section className={canAccessControls ? "templateB" : "templateC"}>
          {gameState === PAGE_STATE.PREPARING && (
            <Box className={"gridElement"}>
              <Typography variant="h4" component="h1">
                {item.name}
              </Typography>
              <Typography variant="body1" component="p">
                {item.description}
              </Typography>
              <Typography
                className={classes.creator}
                variant="caption"
                component="span"
              >
                Created by: <b>Michael</b>
              </Typography>
              <Box className={classes.controls}>
                <Button
                  variant="contained"
                  color="green"
                  onClick={handleStartGame}
                >
                  Начать игру
                </Button>
              </Box>
            </Box>
          )}
          {gameState === PAGE_STATE.LOADING && (
            <>
              <Game item={item} clickBackHandler={clickBackHandler} />
              <Proceed wrapper={"main"} />
            </>
          )}
          {gameState === PAGE_STATE.RUNNING && (
            <Game item={item} clickBackHandler={clickBackHandler} />
          )}
          {canAccessControls && (
            <Box className={"gridElement"}>
              <Constructor />
            </Box>
          )}
        </section>
      </Fade>
    </AnimationContext.Provider>
  );
};
