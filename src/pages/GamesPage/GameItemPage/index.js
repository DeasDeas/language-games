import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import "../../styles.css";
import classes from "./styles.module.css";
import Typography from "@material-ui/core/Typography";
import { Button, IconButton } from "../../../mui/themes";
import { ANIMATION_SPEED, PAGE_STATE } from "../../../vars/consts";
import { Game } from "../../../containers/Game";
import { Constructor } from "../../../containers/Game/Constructor";
import Fade from "@material-ui/core/Fade";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/auth/selectors";
import { selectPageState } from "../../../features/pageState/selectors";
import { setPageState } from "../../../features/pageState";
import { AnimationContext } from "../../contexts/AnimationContext";
import { GameContext, defaultGameContext } from "../../contexts/GameContext";
import { isEqual } from "lodash";
import { Settings } from "@material-ui/icons";

export const GameItemPage = ({ item }) => {
  const currentUser = useSelector(selectCurrentUser),
    dispatch = useDispatch(),
    [gameState, setGameState] = [
      useSelector(selectPageState),
      (pageState) => dispatch(setPageState({ newState: pageState })),
    ],
    [animate, setAnimate] = useState(true),
    [animateControls, setAnimateControls] = useState(false),
    [controlsAccess, setControlsAccess] = useState(false),
    [gameContext, setGameContext] = useState(defaultGameContext),
    setGameContextValue = (gameContextValue) => {
      !isEqual(gameContext.gameContextValue, gameContextValue) &&
        setGameContext({
          ...gameContext,
          gameContextValue: gameContextValue,
        });
    },
    [contextModified, setContextModified] = useState(false);

  const canAccessControls =
    currentUser &&
    (currentUser.id === item.owner || currentUser.status === "staff");

  const handleAccessControls = () => {
    setAnimateControls(false);
    setControlsAccess(!controlsAccess);
    setGameContext({
      ...gameContext,
      gameContextValue: {
        ...gameContext.gameContextValue,
        controlsAccess: !controlsAccess,
      },
    });
    setTimeout(() => setAnimateControls(true), ANIMATION_SPEED.QUICK);
  };

  return (
    <GameContext.Provider
      value={{
        ...gameContext,
        setGameContextValue: setGameContextValue,
      }}
    >
      <AnimationContext.Consumer>
        {(animations) => {
          const {
            animationContextValue,
            setAnimationContextValue,
          } = animations;

          if (!contextModified) {
            setAnimationContextValue({
              ...animationContextValue,
              toggleGamePageAnimation: animationContextValue.toggleAnimation(
                setAnimate
              ),
            });
            setContextModified(true);
          }

          const clickBackHandler = () => {
            setGameState(PAGE_STATE.PREPARING);
          };

          const handleStartGame = () => {
            animationContextValue.toggleGamePageAnimation(() => {
              setGameState(PAGE_STATE.LOADING);
              setTimeout(() => {
                setGameState(PAGE_STATE.RUNNING);
              }, ANIMATION_SPEED.MEDIUM);
            });
          };

          return (
            <Fade in={animate}>
              <section className={controlsAccess ? "templateB" : "templateC"}>
                {gameState === PAGE_STATE.PREPARING && (
                  <Box className={"gridElement"}>
                    <Box className={"rowContainer"}>
                      <Typography variant="h4" component="h1">
                        {item.name}
                      </Typography>
                      <Box className={"rowContainer"}>
                        {!controlsAccess && canAccessControls && (
                          <IconButton
                            className={classes.constructorButton}
                            variant="contained"
                            color="orange"
                            onClick={handleAccessControls}
                          >
                            <Settings />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
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
                {gameState !== PAGE_STATE.PREPARING && (
                  <Game
                    item={item}
                    clickBackHandler={clickBackHandler}
                    inConstructor={controlsAccess}
                    constructorVisibilityProps={{controlsAccess, canAccessControls, handleAccessControls}}
                  />
                )}
                {controlsAccess && (
                  <Fade in={animateControls}>
                    <Box className={`${classes.constructor}`}>
                      <Constructor
                        taskId={item.id}
                        closeHandler={handleAccessControls}
                      />
                    </Box>
                  </Fade>
                )}
              </section>
            </Fade>
          );
        }}
      </AnimationContext.Consumer>
    </GameContext.Provider>
  );
};
