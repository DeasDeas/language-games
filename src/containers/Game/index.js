import React, { useState } from "react";
import classes from "./styles.module.css";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { GAME_TYPES, PAGE_STATE } from "../../vars/consts";
import { WordSet } from "./WordSet";
import { PictureSet } from "./PictureSet";
import { Stepper } from "../../components/Stepper";
import { IconButton } from "../../mui/themes";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeSelectSet, selectAllSets } from "../../features/game/selectors";
import { useSelector } from "react-redux";
import { AnimationContext } from "../../pages/GamesPage/GameItemPage/AnimationContext";
import Fade from "@material-ui/core/Fade";
import { selectPageState } from "../../features/pageState/selectors";

export const Game = ({ item, clickBackHandler }) => {
  const [currentSetIdx, setCurrentSetIdx] = useState(0),
    sets = useSelector(selectAllSets),
    selectSet = React.useMemo(makeSelectSet, []),
    set = useSelector((state) => selectSet(state, sets[currentSetIdx])) || {},
    [animate, setAnimate] = useState(true);

  const SetTypes = {
    [GAME_TYPES.WORDS]: (
      <WordSet animate={animate} setId={sets[currentSetIdx]} />
    ),
    [GAME_TYPES.PICTURES]: (
      <PictureSet animate={animate} setId={sets[currentSetIdx]} />
    ),
  };

  const [stepForward, stepBackward] = [
    () => {
      setCurrentSetIdx(currentSetIdx + 1);
    },
    () => {
      setCurrentSetIdx(currentSetIdx - 1);
    },
  ];

  return (
    <AnimationContext.Consumer>
      {(animations) => {
        const { toggleMainPageAnimation, toggleAnimation } = animations;
        return (
          <section className={`${classes.gameWrapper}`}>
            <Box className={`gridElement ${classes.s1}`}>
              <Fade in={animate}>
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
              </Fade>
              <IconButton
                onClick={() => toggleMainPageAnimation(clickBackHandler)}
                className={classes.returnButton}
                variant="contained"
                color="primary"
              >
                <ArrowBackIcon />
              </IconButton>
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
  );
};
