import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetCard } from "../SetCard/SetCard";
import classes from "./GameManager.module.css";
import { PictureCard } from "../PictureCard/PictureCard";
import { WordCard } from "../WordCard/WordCard";
import {
  readGameState,
  switchSet,
  completeSet,
  redoSet, getData,
} from "../../features/game/gameSlice";

export const GameManager = (props) => {
  const currentSet = useSelector((state) => state.game.currentSet);
  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  const setsQ = game.sets.allIds.length;

  const completeDisabled =
    game.session &&
    !(game.sets.byId[game.sets.allIds[currentSet - 1]].wordsOrder.length === 0);

  const correctWords =
    game.session &&
    game.sets.byId[game.sets.allIds[currentSet - 1]].picturesOrder.map(
      (pictureId) => {
        return game.pictures.byId[pictureId].word;
      }
    );

  const redoHandler = () => {
    dispatch(
      redoSet({
        setId: game.sets.allIds[currentSet - 1],
      })
    );
  };

  const completeHandler = () => {
    dispatch(
      completeSet({
        setId: game.sets.allIds[currentSet - 1],
        correctWords: correctWords,
      })
    );
  };

  const getWords = () =>
    game.sets.byId[game.sets.allIds[currentSet - 1]].wordsOrder.map(
      (word, idx) => {
        return <WordCard word={word} key={`picture${idx}`} id={`word${idx}`} />;
      }
    );

  const wordsResult = useSelector(
    (state) => state.game.results[game.sets.allIds[currentSet - 1]]
  );

  const getPictures = () =>
    game.sets.byId[game.sets.allIds[currentSet - 1]].picturesOrder.map(
      (pictureId, idx) => {
        const { src, word } = game.pictures.byId[pictureId];
        const wordResult = wordsResult[idx].word;

        return (
          <PictureCard
            key={`picture${idx}`}
            id={`picture${idx}`}
            src={src}
            word={wordResult}
            position={idx}
            setId={game.sets.allIds[currentSet - 1]}
            completed={
              game.sets.byId[game.sets.allIds[currentSet - 1]].completed
            }
            correctWord={word}
            isCorrect={
              game.results[game.sets.allIds[currentSet - 1]][idx].correct
            }
          />
        );
      }
    );

  return (
    <div className={classes.GameWrapper}>
      <span className={classes.SetsCounter}>
        Set <b>{currentSet}</b> / {setsQ}
      </span>
      <div className={classes.SetsWrapper}>
        <button
          className={`${
            currentSet === 1 ? classes.Arrow__disabled : classes.Arrow
          }`}
          onClick={() => {
            dispatch(switchSet({ direction: "left", length: setsQ }));
          }}
          disabled={currentSet === 1}
        >
          &#xE76B;
        </button>
        <SetCard
          pictures={game.session && getPictures()}
          words={game.session && getWords()}
          completeDisabled={game.session && completeDisabled}
          completeHandler={completeHandler}
          redoHandler={redoHandler}
          completeState={
            game.session &&
            game.sets.byId[game.sets.allIds[currentSet - 1]].completed
          }
          repeatable={
            game.session &&
            game.sets.byId[game.sets.allIds[currentSet - 1]].repeatable
          }
          refreshHandler={props.refreshHandler}
        />
        <button
          className={`${
            currentSet === setsQ ? classes.Arrow__disabled : classes.Arrow
          }`}
          onClick={() => {
            dispatch(switchSet({ direction: "right", length: setsQ }));
          }}
          disabled={currentSet === setsQ}
        >
          &#xE76C;
        </button>
      </div>
    </div>
  );
};
