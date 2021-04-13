import React, { useState } from "react";
import classes from "../styles.module.css";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Button } from "../../../mui/themes";
import { makeSelectSetItems } from "../../../features/game/selectors";
import { useDispatch, useSelector } from "react-redux";
import { ITEM_TYPES, PLACEHOLDER_IMG } from "../../../vars/consts";
import Grow from "@material-ui/core/Grow";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Tooltip from "@material-ui/core/Tooltip";
import { addWord } from "../../../features/game";

export const PictureSet = ({ set, animate }) => {
  const selectedSetItems = React.useMemo(makeSelectSetItems, []),
    items = useSelector((state) => selectedSetItems(state, set.id)),
    excludedItems = items.filter((e) =>
      set.results.every((itemId) => e.id !== itemId)
    ),
    [selectedItem, setSelectedItem] = useState(null),
    handleRadioCheck = (event) => {
      setSelectedItem(event.currentTarget.id);
    },
    dispatch = useDispatch();

  return (
    <DndProvider backend={HTML5Backend}>
      <Box className={classes.pictureSet}>
        <Grow in={animate}>
          <Box className={classes.pictures}>
            {items.map((item, idx) => {
              const word = (() => {
                  const item = items.find((e) => e.id === set.results[idx]);

                  return !!item && item.word;
                })(),
                handleAddWord = (itemId) =>
                  dispatch(
                    addWord({
                      itemId: itemId,
                      position: idx,
                      setId: set.id,
                    })
                  );

              return (
                <Picture
                  handlers={{
                    handleRadioCheck,
                    handleAddWord,
                  }}
                  key={item.id}
                  item={item}
                  word={word}
                />
              );
            })}
          </Box>
        </Grow>
        <Grow in={animate}>
          <Box className={classes.words}>
            {excludedItems.map((item) => {
              return (
                <Word
                  key={item.id}
                  item={item}
                  selected={item.id === selectedItem}
                />
              );
            })}
          </Box>
        </Grow>
        <Box className={classes.setControls}>
          <Button
            className={classes.completeButton}
            variant="contained"
            color="green"
          >
            Выполнить
          </Button>
        </Box>
      </Box>
    </DndProvider>
  );
};

const Picture = React.memo(({ item, handlers, word }) => {
  const [collectedProps, drop, collect] = useDrop({
    accept: ITEM_TYPES.WORD,
    drop: (dragObject) => {
      handlers.handleAddWord(dragObject.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      style: {
        background: !!monitor.isOver() && "var(--secondary-bg-color-darken)",
      },
    }),
  });

  return (
    <>
      <input
        onChangeCapture={handlers.handleRadioCheck}
        type="radio"
        id={item.id}
        name="pictures"
        value={item.id}
      />
      <label className={classes.itemWrapper} htmlFor={item.id}>
        <Box className={classes.imageWrapper}>
          <img {...[item.image.src ? item.image : PLACEHOLDER_IMG][0]} />
        </Box>
        <Box
          ref={drop}
          {...collectedProps}
          className={`${classes.word}`}
          onClick={() => handlers.handleAddWord(null)}
        >
          {word ? (
            <Tooltip title={word} aria-label={word}>
              <Typography
                className={`${classes.wordInner}`}
                variant="body1"
                component="span"
              >
                {word}
              </Typography>
            </Tooltip>
          ) : (
            <Typography
              className={`${classes.wordInner}`}
              variant="body1"
              component="span"
            >
              {word}
            </Typography>
          )}
        </Box>
      </label>
    </>
  );
});

const Word = React.memo(({ item, selected }) => {
  const labelClasses = selected
    ? `${classes.item} ${classes.item__selected} ${classes.word} ${classes.word__animateIn}`
    : `${classes.item} ${classes.word} ${classes.word__animateIn}`;

  const { id, word } = item;
  const [collectedProps, drag] = useDrag({
    item: {
      id,
      word,
      type: ITEM_TYPES.WORD,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      animate: monitor.isDragging()
        ? classes.word__animateOut
        : classes.word__animateIn,
    }),
  });

  return (
    <label ref={drag} htmlFor={id} {...collectedProps} className={`${labelClasses} ${collectedProps.animate}`}>
      <Tooltip title={item.word} aria-label={item.word}>
        <Typography
          className={classes.wordContent}
          variant="body1"
          component="span"
        >
          {word}
        </Typography>
      </Tooltip>
    </label>
  );
});
