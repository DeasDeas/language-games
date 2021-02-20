import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { SetCard } from "../SetCard/SetCard";
import { PictureCard } from "../PictureCard/PictureCard";
import { WordCard } from "../WordCard/WordCard";
import { switchSet, completeSet, redoSet } from "../../features/game/gameSlice";

import classes from "./GameManager.module.css";

export const GameManager = (props) => {
  const currentSetIdx = useSelector((state) => state.game.currentSet);
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  const setsQ = game.sets.allIds.length;
  const { wordsOrder, picturesOrder } = game.sets.byId[
    game.sets.allIds[currentSetIdx]
  ];
  const { completed, correct, repeatable } = game.sets.byId[
    game.sets.allIds[currentSetIdx]
  ];
  const completeDisabled = !(wordsOrder.length === 0);
  const wordsResult = useSelector(
    (state) => state.game.results[game.sets.allIds[currentSetIdx]]
  );
  const correctWords = picturesOrder.map((pictureId) => {
    return game.pictures.byId[pictureId].word;
  });

  function redoHandler() {
    dispatch(
      redoSet({
        setId: game.sets.allIds[currentSetIdx],
      })
    );
  }

  function completeHandler() {
    dispatch(
      completeSet({
        setId: game.sets.allIds[currentSetIdx],
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
      const wordResult = wordsResult[idx].word;

      return (
        <PictureCard
          key={`picture${idx}`}
          id={`picture${idx}`}
          src={src}
          word={wordResult}
          position={idx}
          setId={game.sets.allIds[currentSetIdx]}
          completed={completed}
          correctWord={word}
          isCorrect={correct}
        />
      );
    });
  }

  return (
    <div className={classes.GameWrapper}>
      <span className={classes.SetsCounter}>
        Set <b>{currentSetIdx + 1}</b> / {setsQ}
      </span>
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
          completeState={completed}
          repeatable={repeatable}
          refreshHandler={props.refreshHandler}
        />
        <button
          className={`${
            currentSetIdx === setsQ ? classes.Arrow__disabled : classes.Arrow
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
