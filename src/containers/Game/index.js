import React, {useState} from "react";
import classes from "./styles.module.css";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { GAME_TYPES } from "../../vars/consts";
import { WordSet } from "./WordSet";
import { PictureSet } from "./PictureSet";
import {Stepper} from "../../components/Stepper";
import {IconButton} from "../../mui/themes";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory, useRouteMatch} from "react-router-dom";

export const Game = (props) => {
  const [currentSetId, setCurrentSetId] = useState("item-1"),
    {item, handlers} = props;

  const SetTypes = {
    [GAME_TYPES.WORDS]: <WordSet {...props} currentSetId={currentSetId}/>,
    [GAME_TYPES.PICTURES]: <PictureSet {...props} setId={currentSetId}/>,
  };

  return (
    <section className={`${classes.gameWrapper}`}>
      <Box className={`gridElement ${classes.s1}`}>
        <Box>
          <Typography variant="h4" component="h1">
            Set 1
          </Typography>
          <Typography variant="body1" component="span">
            Lorem ipsum dolor sit amet
          </Typography>
        </Box>
        <IconButton onClick={handlers.clickBackHandler} className={classes.returnButton} variant="contained" color="primary">
          <ArrowBackIcon/>
        </IconButton>
      </Box>
      <Box className={`gridElement`}>
      {SetTypes[item.type]}
      </Box>
      <Box className={classes.nav}>
        <Stepper/>
      </Box>
    </section>
  );
};
