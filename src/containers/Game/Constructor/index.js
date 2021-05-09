import React, { Fragment, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import classes from "../styles.module.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { IconButton } from "../../../mui/themes";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { PAGE_STATE, PLACEHOLDER_IMG } from "../../../vars/consts";
import Typography from "@material-ui/core/Typography";
import SaveIcon from "@material-ui/icons/Save";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useSelector } from "react-redux";
import { selectPageState } from "../../../features/pageState/selectors";
import { GameContext } from "../../../pages/contexts/GameContext";
import { selectItem, selectSetById } from "../../../features/game/selectors";
import { Add, Shuffle } from "@material-ui/icons";
import { selectInstanceById } from "../../../features/gameInstances/selectors";
import { cloneDeep } from "lodash";

const offsetTop = (x) => {
  return { marginTop: x };
};

export const Constructor = ({ taskId }) => {
  const gameState = useSelector(selectPageState);

  return (
    <GameContext.Consumer>
      {(gameContext) => {
        const { setId, itemId } = gameContext.gameContextValue;

        return gameState === PAGE_STATE.PREPARING ? (
          <Box className={`gridElement ${classes.forms}`}>
            <TaskControlsForm itemId={taskId} />
          </Box>
        ) : (
          <>
            <Box className={`gridElement ${classes.forms}`}>
              <SetControlsForm setId={setId} />
              <ItemChangeForm itemId={itemId} />
            </Box>
            <Box>
              <IconButton
                className={classes.addSetButton}
                variant="contained"
                color="green"
              >
                <Add style={{ fontSize: "3rem" }} />
              </IconButton>
            </Box>
          </>
        );
      }}
    </GameContext.Consumer>
  );
};

const makeHandleTextFieldChange = (formState, setFormState) => (event) => {
  const newState = cloneDeep(formState);

  switch (event.target.getAttribute("data-value")) {
    case "name": {
      newState.name = event.target.value;
      setFormState(newState);
      return;
    }
    case "description": {
      newState.description = event.target.value;
      setFormState(newState);
      return;
    }
    case "image": {
      newState.image.src = event.target.value;
      setFormState(newState);
      return;
    }
    case "word": {
      newState.word = event.target.value;
      setFormState(newState);
      return;
    }
    default: {
      return;
    }
  }
};

const TaskControlsForm = ({ itemId }) => {
  const gameInstance = useSelector((state) =>
      selectInstanceById(state, itemId)
    ),
    [formState, setFormState] = useState({
      name: gameInstance ? gameInstance.name : "",
      description: gameInstance ? gameInstance.description : "",
      type: "",
    });

  useEffect(() => {
    setFormState({
      name: gameInstance ? gameInstance.name : "",
      description: gameInstance ? gameInstance.description : "",
      type: "",
    });
  }, [itemId]);

  const handleTextFieldChange = makeHandleTextFieldChange(
    formState,
    setFormState
  );

  return (
    <>
      <Box
        className={classes.asideChangeForm}
        onChange={handleTextFieldChange}
        component="form"
      >
        <Typography variant="body1" component="span">
          {"Игра: "}
        </Typography>
        <Typography variant="h6" component="span">
          {gameInstance.name}
        </Typography>
        <TextField
          style={offsetTop("5px")}
          className={`${classes.inputField}`}
          label="Name"
          value={formState.name}
          inputProps={{ "data-value": "name" }}
          multiline={true}
          spellCheck={false}
        />
        <TextField
          style={offsetTop("5px")}
          className={`${classes.inputField} ${classes.offsetTop1X}`}
          label="Description"
          value={formState.description}
          multiline={true}
          spellCheck={false}
          inputProps={{ "data-value": "description" }}
        />
        <Box className={`${classes.offsetTop4X} ${classes.controls}`}>
          <IconButton
            className={classes.iconButton}
            variant="contained"
            color="primary"
          >
            <SaveIcon />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            variant="contained"
            color="red"
          >
            <DeleteForeverIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

const SetControlsForm = ({ setId }) => {
  const set = useSelector((state) => selectSetById(state, setId)),
    [formState, setFormState] = useState({
      name: set ? set.name : "",
      description: set ? set.description : "",
      type: "",
    });

  useEffect(() => {
    setFormState({
      name: set ? set.name : "",
      description: set ? set.description : "",
      type: "",
    });
  }, [setId]);

  const handleTextFieldChange = makeHandleTextFieldChange(
    formState,
    setFormState
  );

  return (
    <>
      <Box
        className={classes.asideChangeForm}
        onChange={handleTextFieldChange}
        component="form"
      >
        <Typography variant="body1" component="span">
          {"Сет: "}
        </Typography>
        <Typography variant="h6" component="span">
          {set && set.name}
        </Typography>
        <TextField
          style={offsetTop("5px")}
          className={`${classes.inputField}`}
          label="Name"
          value={formState.name}
          inputProps={{ "data-value": "name" }}
        />
        <TextField
          style={offsetTop("5px")}
          className={`${classes.inputField} ${classes.offsetTop1X}`}
          label="Description"
          value={formState.description}
          multiline={true}
          spellCheck={false}
          inputProps={{ "data-value": "description" }}
        />
        <Box className={`${classes.offsetTop4X} ${classes.controls}`}>
          <IconButton
            className={classes.iconButton}
            variant="contained"
            color="primary"
          >
            <SaveIcon />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            variant="contained"
            color="orange"
          >
            <Shuffle />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            variant="contained"
            color="red"
          >
            <DeleteForeverIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

const ItemChangeForm = ({ itemId }) => {
  const item = useSelector((state) => selectItem(state, itemId)),
    [type, setType] = useState("10"),
    [formState, setFormState] = useState({
      image: PLACEHOLDER_IMG,
      word: item ? item.word : "",
      type: "",
    }),
    isAddItem = itemId === "add-item";

  const handleTextFieldChange = makeHandleTextFieldChange(
    formState,
    setFormState
  );

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  useEffect(() => {
    setFormState({
      image: item ? item.image : PLACEHOLDER_IMG,
      word: item ? item.word : "",
      type: "",
    });
  }, [itemId]);

  return (
    <Fragment>
      <Box
        className={classes.asideChangeForm}
        onChange={handleTextFieldChange}
        component="form"
      >
        <Box className={classes.imageWrapper}>
          <picture>
            <img {...PLACEHOLDER_IMG} />
            <img {...formState.image} />
          </picture>
        </Box>
        <TextField
          style={offsetTop("5px")}
          className={`${classes.inputField}`}
          label="Image"
          value={formState.image !== PLACEHOLDER_IMG ? formState.image.src : ""}
          inputProps={{ "data-value": "image" }}
        />
        <TextField
          style={offsetTop("5px")}
          className={`${classes.inputField}`}
          label="Word"
          value={formState.word}
          inputProps={{ "data-value": "word" }}
        />
        <Box className={`${classes.selectorWrapper} ${classes.offsetTop2X}`}>
          <InputLabel id="type-selector" shrink>
            Type
          </InputLabel>
          <Select
            className={classes.typeSelector}
            labelId="type-selector"
            value={type}
            onChange={handleTypeChange}
            disabled
          >
            <MenuItem value={10}>All</MenuItem>
          </Select>
        </Box>
        <Box className={`${classes.offsetTop4X} ${classes.controls}`}>
          {isAddItem ? (
            <IconButton
              className={classes.iconButton}
              variant="contained"
              color="green"
            >
              <Add />
            </IconButton>
          ) : (
            <IconButton
              className={classes.iconButton}
              variant="contained"
              color="primary"
            >
              <SaveIcon />
            </IconButton>
          )}
          <IconButton
            className={classes.iconButton}
            variant="contained"
            color="red"
            disabled={isAddItem}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Box>
      </Box>
    </Fragment>
  );
};
