import React, { useState } from "react";
import classes from "../styles.module.css";
import Box from "@material-ui/core/Box";
import { testData } from "../../../pages/TemplatePage";
import Typography from "@material-ui/core/Typography";
import { Button } from "../../../mui/themes";
import { makeSelectSetItems } from "../../../features/game/selectors";
import { useSelector } from "react-redux";
import { PLACEHOLDER_IMG } from "../../../vars/consts";
import Fade from "@material-ui/core/Fade";
import Grow from "@material-ui/core/Grow";

export const PictureSet = ({ setId, animate }) => {
  const selectedSetItems = React.useMemo(makeSelectSetItems, []),
    items = useSelector((state) => selectedSetItems(state, setId));

  const [selectedItem, setSelectedItem] = useState(null);

  const handleRadioCheck = (event) => {
    setSelectedItem(event.currentTarget.id);
  };

  return (
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
  );
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
        {item.image.src ? <img src={item.image.src} alt={item.image.alt} /> : <img {...PLACEHOLDER_IMG}/>}
        <Box className={`${classes.word}`}>{null}</Box>
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
