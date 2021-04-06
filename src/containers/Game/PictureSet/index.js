import React, { useState } from "react";
import classes from "../styles.module.css";
import Box from "@material-ui/core/Box";
import { testData } from "../../../pages/TemplatePage";
import Typography from "@material-ui/core/Typography";
import {Button} from "../../../mui/themes";

export const PictureSet = () => {
  let items = testData.pictureItems.allIds.map(
    (item) => testData.pictureItems.byIds[item]
  );

  const [selectedItem, setSelectedItem] = useState(null);
  const handleRadioCheck = (event) => {
    setSelectedItem(event.currentTarget.id);
  };

  return (
    <Box className={classes.pictureSet}>
      <Box className={classes.pictures}>
        {items.map((item) => (
          <Picture
            handleRadioCheck={handleRadioCheck}
            key={item.id}
            item={item}
          />
        ))}
      </Box>
      <Box className={classes.words}>
        {items.map((item) => {
          if (item.id === selectedItem) {
            return <Word key={item.id} item={item} selected={true} />;
          } else {
            return <Word key={item.id} item={item} selected={false} />;
          }
        })}
      </Box>
      <Box className={classes.setControls}>
        <Button className={classes.completeButton} variant="contained" color="green">
          Выполнить
        </Button>
      </Box>
    </Box>
  );
};

const placeholder = {
  src:
    "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png",
};

const Picture = React.memo(({ item, handleRadioCheck }) => {
  return (
    <>
      <input
        onChangeCapture={handleRadioCheck}
        type="radio"
        id={item.id}
        name="pictures"
        value={item.id}
      />
      <label className={classes.item} for={item.id}>
        <img
          src={!!item.image ? item.image.src : placeholder.src}
          alt={placeholder.alt}
        />
        <Box className={`${classes.word}`}></Box>
      </label>
    </>
  );
});

const Word = React.memo(({ item, selected }) => {
  const labelClasses = selected
    ? `${classes.item} ${classes.item__selected} ${classes.word}`
    : `${classes.item} ${classes.word}`;

  return (
    <label for={item.id} className={labelClasses}>
      <Typography variant="body1" component="span">
        {item.word}
      </Typography>
    </label>
  );
});
