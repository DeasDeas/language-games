import React, { useEffect, useState } from "react";
import classes from "./styles.module.css";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { GAME_TYPES, PAGE_STATE } from "../../vars/consts";
import { WordSet } from "./WordSet";
import { PictureSet } from "./PictureSet";
import { Stepper } from "../../components/Stepper";
import { IconButton } from "../../mui/themes";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { selectAllSets, selectSetByIdx } from "../../features/game/selectors";
import { useSelector } from "react-redux";
import { AnimationContext } from "../../pages/contexts/AnimationContext";
import { Proceed } from "../../components/Proceed";
import { selectPageState } from "../../features/pageState/selectors";
import Grow from "@material-ui/core/Grow";
import { Settings } from "@material-ui/icons";

export const Game = ({
  item,
  clickBackHandler,
  inConstructor,
  constructorVisibilityProps,
}) => {
  const [currentSetIdx, setCurrentSetIdx] = useState(0),
    sets = useSelector((state) => selectAllSets(state)),
    set = useSelector((state) => selectSetByIdx(state, currentSetIdx)) || {},
    [animate, setAnimate] = useState(true),
    pageState = useSelector(selectPageState),
    {
      controlsAccess,
      canAccessControls,
      handleAccessControls,
    } = constructorVisibilityProps;

  const SetTypes = {
    [GAME_TYPES.WORDS]: (
      <WordSet animate={animate} set={set} inConstructorMode={inConstructor} />
    ),
    [GAME_TYPES.PICTURES]: (
      <PictureSet
        animate={animate}
        set={set}
        maxItems={12}
        inConstructorMode={inConstructor}
      />
    ),
  };

  const [stepForward, stepBackward] = [
    () => {
      setCurrentSetIdx((prevActiveStep) => prevActiveStep + 1);
    },
    () => {
      setCurrentSetIdx((prevActiveStep) => prevActiveStep - 1);
    },
  ];

  return (
    <>
      <AnimationContext.Consumer>
        {(animations) => {
          const {
            toggleGamePageAnimation,
            toggleAnimation,
          } = animations.animationContextValue;

          return (
            <section className={`${classes.gameWrapper}`}>
              <Box className={`gridElement ${classes.s1}`}>
                <Grow in={animate}>
                  <Box>
                    <Box className={"rowContainer"}>
                      <Box>
                        <Typography variant="h4" component="h1">
                          {set.name}
                        </Typography>
                        <Typography variant="body1" component="span">
                          {set.description}
                        </Typography>
                        <Typography variant="body1" component="span">
                          type: {set.type}
                        </Typography>
                      </Box>
                      <Box className={"rowContainer"}>
                        <IconButton
                          onClick={() =>
                            toggleGamePageAnimation(clickBackHandler)
                          }
                          className={`${classes.returnButton} controlsButton`}
                          variant="contained"
                          color="primary"
                        >
                          <ArrowBackIcon />
                        </IconButton>
                        {!controlsAccess && canAccessControls && (
                          <IconButton
                            className={"controlsButton"}
                            variant="contained"
                            color="orange"
                            onClick={handleAccessControls}
                          >
                            <Settings />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Grow>
              </Box>
              <Box className={`gridElement`}>{SetTypes[set.type]}</Box>
              <Box className={classes.nav}>
                <Stepper
                  length={sets.length}
                  stepForward={() => toggleAnimation(setAnimate)(stepForward)}
                  stepBackward={() => toggleAnimation(setAnimate)(stepBackward)}
                />
              </Box>
            </section>
          );
        }}
      </AnimationContext.Consumer>
      {pageState === PAGE_STATE.LOADING && <Proceed wrapper={"main"} />}
    </>
  );
};