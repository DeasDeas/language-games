import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { SetCard } from "../SetCard/SetCard";
import { PictureCard } from "../PictureCard/PictureCard";
import { WordCard } from "../WordCard/WordCard";
import {
  switchSet,
  completeSet,
  redoSet,
  setAdded, setDeleted,
} from "../../features/game/gameSlice";

import classes from "./GameManager.module.css";
import { Button } from "../../mui/themes";
import {sendData} from "../../features/thunks/gameMiddleware";

export const GameManager = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.pk)
  const currentSetIdx = useSelector((state) => state.game.currentSet);
  const setId = useSelector(
    (state) => state.game.sets.allIds[state.game.currentSet]
  );
  const game = useSelector((state) => state.game);
  const setsQ = game.sets.allIds.length;
  const { wordsOrder, picturesOrder, completed, repeatable } = game.sets.byId[
    setId
  ];
  const completeDisabled = !(wordsOrder.length === 0);
  const wordsResult = useSelector((state) => state.game.results[setId]);
  const correctWords = picturesOrder.map(
    (pictureId) => game.pictures.byId[pictureId].word
  );

  const addSetHandler = () => {
    dispatch(setAdded());
  };

  const deleteSetHandler = (setId) => {
    dispatch(setDeleted({id:setId}));
  }

  function applyHandler() {
    dispatch(
      sendData({state:game, userId})
    )
  }

  function redoHandler() {
    dispatch(
      redoSet({
        setId: setId,
      })
    );
  }

  function completeHandler() {
    dispatch(
      completeSet({
        setId: setId,
        correctWords: correctWords,
      })
    );
  }

  function getWords() {
    return wordsOrder.map((word, idx) => {
      return <WordCard word={word} key={`picture${idx}`} id={`word${idx}`} />;
    });
  }

  function getPictures() {
    return picturesOrder.map((pictureId, idx) => {
      const { src, word } = game.pictures.byId[pictureId];
      const { word: wordResult, correct } = wordsResult[idx];

      return (
        <PictureCard
          key={`picture${idx}`}
          id={`picture${idx}`}
          src={src}
          word={wordResult}
          position={idx}
          setId={setId}
          completed={completed}
          correctWord={word}
          isCorrect={correct}
          constructor={props.constructor}
          pictureId={pictureId}
        />
      );
    });
  }

  return (
    <div className={classes.GameWrapper}>
      <div className={classes.header}>
        <span className={classes.SetsCounter}>
          Set <b>{currentSetIdx + 1}</b> / {setsQ}
        </span>
        {props.constructor && (
          <Button variant="contained" color="orange" onClick={addSetHandler}>
            create new set
          </Button>
        )}
      </div>
      <div className={classes.SetsWrapper}>
        <button
          className={`${
            currentSetIdx === 0 ? classes.Arrow__disabled : classes.Arrow
          }`}
          onClick={() => {
            dispatch(switchSet({ direction: "left", length: setsQ }));
          }}
          disabled={currentSetIdx === 0}
        >
          &#xE76B;
        </button>
        <SetCard
          pictures={getPictures()}
          words={getWords()}
          completeDisabled={completeDisabled}
          completeHandler={completeHandler}
          redoHandler={redoHandler}
          deleteSetHandler={deleteSetHandler}
          applyHandler={applyHandler}
          completeState={completed}
          repeatable={repeatable}
          refreshHandler={props.refreshHandler}
          constructor={props.constructor}
          setId={setId}
        />
        <button
          className={`${
            currentSetIdx === setsQ - 1 ? classes.Arrow__disabled : classes.Arrow
          }`}
          onClick={() => {
            dispatch(switchSet({ direction: "right", length: setsQ }));
          }}
          disabled={currentSetIdx === setsQ - 1}
        >
          &#xE76C;
        </button>
      </div>
    </div>
  );
};
