import React from "react";
import { useDrag } from "react-dnd";

import { ItemTypes } from "../../constants";

import classes from "./WordCard.module.css";
import { CardContent, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";

export const WordCard = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.WORD, word: props.word },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Card
      id={props.id}
      className={classes.wordCard}
      elevation={3}
      ref={drag}
      style={{
        visibility: isDragging ? "hidden" : "visible",
      }}
    >
      <CardContent>
        <Typography variant="body2" component="span">{props.word}</Typography>
      </CardContent>
    </Card>
  );
};
