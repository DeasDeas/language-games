import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AddPictureModal from "../Modal/AddPictureModal/AddPictureModal";
import { Frame } from "../Frame/Frame";
import { Panel } from "../Panel/Panel";

import classes from "./SetCard.module.css";
import { Button, IconButton } from "../../mui/themes";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";


export const SetCard = (props) => {
  const attempts = props.repeatable;
  const controlsWrapperClasses = props.constructor
    ? classes.controlsWrapper__constructor
    : classes.controlsWrapper;

  return (
    <DndProvider backend={HTML5Backend}>
      <Frame styles={classes.setCard}>
        <Panel styles={classes.picturesWrapper}>
          {props.pictures}
          {props.constructor && <AddPictureModal setId={props.setId} />}
        </Panel>
        <Panel styles={classes.wordsWrapper}>{props.words}</Panel>
        <Box className={controlsWrapperClasses}>
          <Button
            className={classes.submitButton}
            disabled={props.completeDisabled || props.completeState}
            onClick={props.completeHandler}
            variant="contained"
            color="green"
          >
            Complete
          </Button>
          <Box className={classes.redoWrapper}>
            <Typography component={"span"} className={classes.counter}>
              Attempts: <b>{attempts}</b>
            </Typography>
            <Button
              className={classes.redoButton}
              disabled={!(attempts !== 0 && props.completeState)}
              onClick={props.redoHandler}
              variant="contained"
              color="orange"
            >
              Redo
            </Button>
          </Box>
          <Button
            className={classes.refreshButton}
            onClick={props.refreshHandler}
            variant="contained"
            color="orange"
          >
            Refresh
          </Button>
          {props.constructor && <ApplyChangesButton applyHandler={props.applyHandler}/>}
        </Box>
        {props.constructor && <Box className={classes.deleteButtonWrapper}>
          <Tooltip title="Delete set" aria-label="add">
            <IconButton onClick={() => props.deleteSetHandler(props.setId)} variant="contained" color="red">
              <DeleteOutline />
            </IconButton>
          </Tooltip>
        </Box>}
      </Frame>
    </DndProvider>
  );
};

const ApplyChangesButton = ({applyHandler}) => {
  return (
    <div className={classes.buttonWrapper}>
      <Button variant="contained" color="green" onClick={applyHandler}>
        APPLY CHANGES
      </Button>
    </div>
  );
};