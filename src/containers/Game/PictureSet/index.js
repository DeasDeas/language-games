import React, { useEffect, useState } from "react";
import classes from "../styles.module.css";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Button } from "../../../mui/themes";
import {
  makeSelectItemsPosition,
  makeSelectSetItems,
} from "../../../features/game/selectors";
import { useDispatch, useSelector } from "react-redux";
import { ITEM_TYPES, PLACEHOLDER_IMG } from "../../../vars/consts";
import Grow from "@material-ui/core/Grow";
import { useDrag, useDrop } from "react-dnd";
import Tooltip from "@material-ui/core/Tooltip";
import { addWord } from "../../../features/game";
import { GameContext } from "../../../pages/contexts/GameContext";
import { ItemPlaceholder } from "../../../components/ItemPlaceholder";

export const PictureSet = ({ set, animate, maxItems, inConstructorMode }) => {
  const selectedSetItems = React.useMemo(makeSelectSetItems, []),
    selectItemsPosition = React.useMemo(makeSelectItemsPosition, []),
    { picturesOrder, wordsOrder } = useSelector((state) =>
      selectItemsPosition(state, set.id)
    ),
    items = useSelector((state) => selectedSetItems(state, set.id)),
    [selectedItem, setSelectedItem] = useState(null),
    itemClickHandler = (event) => {
      setSelectedItem(event.currentTarget.id);
    },
    dispatch = useDispatch();

  const dropSelection = !items.find((item) => item.id === selectedItem);

  useEffect(() => {
    (dropSelection || !inConstructorMode) && setSelectedItem("add-item");
  }, [dropSelection, inConstructorMode]);

  return (
    <GameContext.Consumer>
      {(gameContext) => {
        const { setGameContextValue, gameContextValue } = gameContext;

        setGameContextValue({
          ...gameContextValue,
          setId: set.id,
          itemId: selectedItem,
        });

        return (
          <Box className={classes.pictureSet}>
            <Grow in={animate}>
              <Box className={classes.pictures}>
                {picturesOrder.map((item, idx) => {
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
                        handleRadioCheck: itemClickHandler,
                        handleAddWord,
                      }}
                      key={item.id}
                      item={item}
                      word={word}
                      selected={item.id === selectedItem}
                      disabled={!gameContextValue.controlsAccess}
                    />
                  );
                })}
                {gameContextValue.controlsAccess && (
                  <ItemPlaceholder
                    clickHandler={itemClickHandler}
                    key={"add-item"}
                    selected={"add-item" === selectedItem}
                  />
                )}
              </Box>
            </Grow>
            <Grow in={animate}>
              <Box className={classes.words}>
                {wordsOrder.map((item) => {
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
        );
      }}
    </GameContext.Consumer>
  );
};

const Picture = React.memo(
  ({ item, handlers, word, selected, disabled, isDone, isCorrect }) => {
    const [collectedProps, drop] = useDrop({
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
          checked={selected}
          disabled={disabled}
        />
        <label className={classes.itemWrapper} htmlFor={item.id}>
          <Box className={classes.imageWrapper}>
            <img {...[item.image.src ? item.image : PLACEHOLDER_IMG][0]} />
          </Box>
          <Box
            ref={drop}
            {...collectedProps}
            className={`${classes.word}`}
            onDoubleClick={() => handlers.handleAddWord(null)}
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
          {isDone && (
            <Box
              className={`${classes.doneOverlay} ${
                isCorrect
                  ? classes.doneOverlay__correct
                  : classes.doneOverlay__incorrect
              }`}
            />
          )}
        </label>
      </>
    );
  }
);

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
    <label
      ref={drag}
      htmlFor={id}
      {...collectedProps}
      className={`${labelClasses} ${collectedProps.animate}`}
    >
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
