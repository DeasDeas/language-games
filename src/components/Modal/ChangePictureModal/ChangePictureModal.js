import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MuiThemeProvider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import Box from "@material-ui/core/Box";

import { Button, mainTheme, IconButton } from "../../../mui/themes";
import classes from "./ChangePictureModal.module.css";
import {
  pictureChanged,
  pictureDeleted,
} from "../../../features/game/gameSlice";

export default function ChangePictureModal(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { src, word } = useSelector(
    (state) => state.game.pictures.byId[props.pictureId]
  );
  const userId = useSelector((state) => state.auth.user.pk);
  const [srcField, setSrcField] = useState(src);
  const [wordField, setWordField] = useState(word);

  const handleClickOpen = () => {
    setOpen(true);
    setSrcField(src);
    setWordField(word);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(
      pictureChanged({
        id: props.pictureId,
        setId: props.setId,
        src: srcField,
        word: wordField,
        owner: userId,
      })
    );

    handleClose();
  };

  const handleDelete = () => {
    dispatch(
      pictureDeleted({
        id: props.pictureId,
      })
    );

    handleClose();
  };

  return (
    <MuiThemeProvider theme={mainTheme}>
      <Box>
        <Box className={classes.buttonWrapper}>
          <IconButton
            variant="contained"
            color="orange"
            onClick={handleClickOpen}
          >
            <CreateOutlinedIcon />
          </IconButton>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Changing picture <b>"{word}"</b>
          </DialogTitle>
          <DialogContent>
            <div className={classes.windowPreview}>
              <img
                draggable={false}
                className={classes.imagePreview}
                src={srcField}
                alt="img"
              />
            </div>
            <DialogContentText className={classes.textDialog}>
              To add picture fill the fields downside
            </DialogContentText>
            <TextField
              autoFocusz
              margin="dense"
              variant="outlined"
              id="imgSrc"
              label="Img src"
              fullWidth
              value={srcField}
              onChange={(e) => setSrcField(e.target.value)}
            />
            <TextField
              margin="dense"
              variant="outlined"
              id="wordText"
              label="Word"
              value={wordField}
              fullWidth
              onChange={(e) => setWordField(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDelete}
              color="secondary"
              style={{ margin: "0 auto 0 0" }}
            >
              Delete
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Change
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </MuiThemeProvider>
  );
}