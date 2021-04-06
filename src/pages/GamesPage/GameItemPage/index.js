import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import "../../styles.css";
import classes from "./styles.module.css";
import Typography from "@material-ui/core/Typography";
import { testData } from "../../TemplatePage";
import { Button } from "../../../mui/themes";
import { PAGE_STATE } from "../../../vars/consts";
import { Game } from "../../../containers/Game";
import { Proceed } from "../../../components/Proceed";
import { Constructor } from "../../../containers/Game/Constructor";
import Fade from "@material-ui/core/Fade";

export const GameItemPage = ({ item }) => {
  const currentUserId = testData.users.byIds[1].id,
    canAccessControls = currentUserId === item.ownerId,
    [gameState, setGameState] = useState(PAGE_STATE.PREPARING),
    loadingTime = 1000,
    [animate, setAnimate] = useState(true);

  const handleStartGame = () => {
    setGameState(PAGE_STATE.LOADING);

    setTimeout(() => {
      setGameState(PAGE_STATE.RUNNING);
    }, loadingTime);
  };

  const newProps = {
    gameState: gameState,
    item: item,
    handlers: {
      clickBackHandler: () => {
        setAnimate(false);
        setTimeout(() => setGameState(PAGE_STATE.PREPARING), 250);
        setTimeout(() => setAnimate(true), 250);
      },
    }
  };

  return (
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
              Created by: <b>{testData.users.byIds[item.ownerId].name}</b>
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
            <Game {...newProps} />
            <Proceed wrapper={"main"} />
          </>
        )}
        {gameState === PAGE_STATE.RUNNING && <Game {...newProps} />}
        {canAccessControls && (
          <Box className={"gridElement"}>
            <Constructor {...newProps} />
          </Box>
        )}
      </section>
    </Fade>
  );
};
