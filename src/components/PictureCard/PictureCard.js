import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

import { ItemTypes, ITEM_STATUS } from "../../constants";
import { placeWord, returnWord } from "../../features/game/gameSlice";

import classes from "./PictureCard.module.css";
import ChangePictureModal from "../Modal/ChangePictureModal/ChangePictureModal";
import Card from "@material-ui/core/Card";
import { CardActionArea, CardContent, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";

export const PictureCard = (props) => {
  const dispatch = useDispatch();
  const isCorrect = props.isCorrect;
  const status = useSelector(
    (state) => state.game.pictures.byId[props.pictureId].status
  );

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
    <Card
      className={classes.PictureCard}
      style={{
        outline:
          props.completed && `2px solid ${isCorrect ? "#73ee65" : "#f53831"}`,
        background: status === ITEM_STATUS.INITIAL ? "white" : "#d9fdaf",
      }}
      elevation={3}
    >
      <CardContent>
        {props.constructor && (
          <ChangePictureModal pictureId={props.pictureId} setId={props.setId} />
        )}
        {/*<img src={props.src} alt="" />*/}
        <CardMedia className={classes.cardMedia} image={props.src} />
      </CardContent>
      <CardActionArea className={classes.actionArea}>
        <Box
          ref={drop}
          style={
            isOver
              ? {
                  background:
                    status === ITEM_STATUS.INITIAL
                      ? "rgb(129,215,241, 0.5)"
                      : "#ffffff",
                }
              : {
                  background:
                    status === ITEM_STATUS.INITIAL ? "white" : "#f5f5f5",
                }
          }
          className={classes.wordSpace}
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
          <Typography variant="body2" component="span">{props.word}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};
