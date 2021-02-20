import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Frame } from "../Frame/Frame";
import { Panel } from "../Panel/Panel";
import { Button } from "../Button/Button";

import classes from "./SetCard.module.css";

export const SetCard = (props) => {
  const completeButtonStyles =
    !props.completeDisabled && !props.completeState
      ? { styleClasses: classes.SubmitButton }
      : { styleClasses: classes.SubmitButton__disabled };

  const attempts = props.repeatable;

  const redoButtonStyles =
    attempts !== 0 && props.completeState
      ? { styleClasses: classes.RedoButton }
      : { styleClasses: classes.RedoButton__disabled };

  return (
    <DndProvider backend={HTML5Backend}>
      <Frame styles={classes.SetCard}>
        <Panel styles={classes.PicturesWrapper}>{props.pictures}</Panel>
        <Panel styles={classes.WordsWrapper}>{props.words}</Panel>
        <div className={classes.ControlsWrapper}>
          <Button
            design={completeButtonStyles}
            disabled={props.completeDisabled || props.completeState}
            click={props.completeHandler}
          >
            Complete
          </Button>
          <div className={classes.RedoWrapper}>
            <span className={classes.Counter}>
              Attempts: <b>{attempts}</b>
            </span>
            <Button
              design={redoButtonStyles}
              disabled={!(attempts !== 0 && props.completeState)}
              click={props.redoHandler}
            >
              Redo
            </Button>
          </div>
          <Button
            design={{ styleClasses: classes.RefreshButton }}
            click={props.refreshHandler}
          >
            Refresh
          </Button>
        </div>
      </Frame>
    </DndProvider>
  );
};
