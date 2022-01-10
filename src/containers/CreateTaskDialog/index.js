import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useDispatch} from "react-redux";
import {addTask as addTaskRequest} from "../../api/tasks";
import {addTask} from "../../features/task";
import {BLANK_MESSAGE} from "../../vars/consts";
import {Message} from "../../components/Message";

export function CreateTaskDialog({ type }) {
  const [open, setOpen] = useState(false),
    [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [isPrivate, setIsPrivate] = useState(true),
    [message, setMessage] = useState(BLANK_MESSAGE),
    [createButtonPressed, setCreateButtonPressed] = useState(false),
    dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
	  setName("");
    setDescription("");
    setIsPrivate(true);
    setMessage(BLANK_MESSAGE)
    setCreateButtonPressed(false)
  };

  const handleCheckboxChange = () => {
    setIsPrivate(!isPrivate);
  }

  const handleSubmit = async () => {
    if (createButtonPressed)
      return

    const response = await addTaskRequest({name, description, isPrivate, type})
    setMessage(response.message)
    if (response.message.status === 200) {
      dispatch(addTask({...response.data}))
      handleClose()
    }
    setCreateButtonPressed(true)
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <Add />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Создать задание</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Для того, чтобы добавить новое задание придумайте название и нажмите
            «Создать».
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Название"
            type="text"
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Описание"
            type="text"
            multiline={true}
            fullWidth
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <FormControlLabel
            control={<Checkbox checked={isPrivate} onChange={handleCheckboxChange} name="is private" />}
            label="Приватное"
          />
        </DialogContent>
        <Message type={message.type}>{message.texts}</Message>
        <DialogActions>
          <Button
            onClick={() => {
              handleSubmit()
            }}
            color="primary"
          >
            Создать
          </Button>
          <Button onClick={handleClose} color="secondary">
            Отменить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}