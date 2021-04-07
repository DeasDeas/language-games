import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import classes from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { pictureAdded } from "../../../features/game";
import { IconButton } from "../../../mui/themes";
import Box from "@material-ui/core/Box";

export default function AddPictureModal(props) {
  const [open, setOpen] = useState(false);
  const [srcField, setSrcField] = useState();
  const [wordField, setWordField] = useState();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.pk);
  const elementsQ = useSelector(state => state.game.sets.byId[props.setId].picturesOrder.length)
  const creationDisabled = () => elementsQ === 12;

  const handleClickOpen = () => {
    setOpen(true);
    setSrcField(null);
    setWordField(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(
      pictureAdded({
        setId: props.setId,
        src: srcField,
        word: wordField,
        owner: userId,
      })
    );

    handleClose();
  };

  return (
    <Box>
      <Box className={classes.buttonWrapper}>
        <IconButton
          variant="contained"
          color="orange"
          onClick={handleClickOpen}
          disabled={creationDisabled()}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add picture</DialogTitle>
        <DialogContent>
          <Box className={classes.windowPreview}>
            <img
              draggable={false}
              className={classes.imagePreview}
              src={!!srcField ? srcField : "https://i.imgur.com/JWsWdpo.png"}
              alt="img"
            />
          </Box>
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
            onChange={(e) => setSrcField(e.target.value)}
            value={srcField}
          />
          <TextField
            margin="dense"
            variant="outlined"
            id="wordText"
            label="Word"
            fullWidth
            onChange={(e) => setWordField(e.target.value)}
            value={wordField}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}