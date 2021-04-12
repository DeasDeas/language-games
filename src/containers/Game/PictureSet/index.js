import React, { useState } from "react";
import classes from "../styles.module.css";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Button } from "../../../mui/themes";
import { makeSelectSetItems } from "../../../features/game/selectors";
import { useSelector } from "react-redux";
import { ITEM_TYPES, PLACEHOLDER_IMG } from "../../../vars/consts";
import Grow from "@material-ui/core/Grow";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const PictureSet = ({ setId, animate }) => {
  const selectedSetItems = React.useMemo(makeSelectSetItems, []),
    items = useSelector((state) => selectedSetItems(state, setId));

  const [selectedItem, setSelectedItem] = useState(null);

  const handleRadioCheck = (event) => {
    setSelectedItem(event.currentTarget.id);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box className={classes.pictureSet}>
        <Grow in={animate}>
          <Box className={classes.pictures}>
            {items.map((item) => (
              <Picture
                handleRadioCheck={handleRadioCheck}
                key={item.id}
                item={item}
              />
            ))}
          </Box>
        </Grow>
        <Grow in={animate}>
          <Box className={classes.words}>
            {items.map((item) => {
              if (item.id === selectedItem) {
                return <Word key={item.id} item={item} selected={true} />;
              } else {
                return <Word key={item.id} item={item} selected={false} />;
              }
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

const Picture = React.memo(({ item, handleRadioCheck }) => {
  const imgProps = item.image.src ? item.image : PLACEHOLDER_IMG;

  return (
    <>
      <input
        onChangeCapture={handleRadioCheck}
        type="radio"
        id={item.id}
        name="pictures"
        value={item.id}
      />
      <label className={classes.itemWrapper} htmlFor={item.id}>
        <Box className={classes.imageWrapper}>
          <img {...[item.image.src ? item.image : PLACEHOLDER_IMG][0]} />
        </Box>
        <Box className={`${classes.word}`}>{null}</Box>
      </label>
    </>
  );
});

const Word = React.memo(({ item, selected }) => {
  const labelClasses = selected
    ? `${classes.item} ${classes.item__selected} ${classes.word}`
    : `${classes.item} ${classes.word}`;

  const { id } = item;
  const [{ isDragging }, drag] = useDrag({
    item: {
      id,
      type: ITEM_TYPES.WORD,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  return (
    <label ref={drag} htmlFor={id} style={{opacity}} className={labelClasses}>
      <Typography variant="body1" component="span">
        {item.word}
      </Typography>
    </label>
  );
});
