import React, {useEffect} from "react";
import classes from "./PictureCard.module.css";
import { ItemTypes } from "../../constants";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { placeWord, returnWord } from "../../features/game/gameSlice";

export const PictureCard = (props) => {
  const dispatch = useDispatch();

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

  const isCorrect = props.isCorrect;

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
