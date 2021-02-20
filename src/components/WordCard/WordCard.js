import React from "react";
import { useDrag } from "react-dnd";

import { ItemTypes } from "../../constants";

import classes from "./WordCard.module.css";

export const WordCard = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.WORD, word: props.word },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      id={props.id}
      ref={drag}
      style={{
        visibility: isDragging ? "hidden" : "visible",
      }}
      className={classes.WordCard}
    >
      <span>{props.word}</span>
    </div>
  );
};
