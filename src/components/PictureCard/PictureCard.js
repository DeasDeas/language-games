import React from "react";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";

import { ItemTypes } from "../../constants";
import { placeWord, returnWord } from "../../features/game/gameSlice";

import classes from "./PictureCard.module.css";

export const PictureCard = (props) => {
  const dispatch = useDispatch();
  const isCorrect = props.isCorrect;

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.WORD,
    drop: (item) => {
      dispatch(
        placeWord({
          word: item.word,
          position: props.position,
          setId: props.setId,
          prevWord: props.word,
        })
      );
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  return (
    <div
      className={classes.PictureCard}
      style={{
        outline: props.completed && (`2px solid ${isCorrect ? "#73ee65" : "#f53831"}`),
      }}
    >
      <img src={props.src} alt="" />
      <div
        ref={drop}
        style={
          isOver
            ? { background: "rgb(129,215,241, 0.5)" }
            : { background: "white" }
        }
        className={classes.WordSpace}
        onDoubleClick={() => {
          !props.completed &&
          dispatch(
            returnWord({
              word: props.word,
              position: props.position,
              setId: props.setId,
            })
          );
        }}
        title="Нажмите два раза для того, чтобы удалить слово"
      >
        {props.word}
      </div>
    </div>
  );
};
