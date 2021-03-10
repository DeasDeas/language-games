import React from "react";
import { Paper } from "@material-ui/core";
import classes from "./Form.module.css";
import TextField from "@material-ui/core/TextField";

export const Form = (props) => {
  const { form } = props;

  return (
    <Paper className={classes.Frame} elevation={3}>
      <div className={classes.FormContent}>
        {createForm(form)}
        {props.children}
      </div>
    </Paper>
  );
};

const createForm = (textInputs) => {
  return textInputs.allIds.map((id) => customTextInput(textInputs.byId[id]));
};

function customTextInput({
  id,
  type = "text",
  variant = "outlined",
  label = "id",
  ref,
  required = false,
  autoComplete = "of",
  onChange,
}) {
  const prefs = {
    id: id,
    type: type,
    variant: variant,
    label: label,
    ref: ref,
    required: required,
    autoComplete: autoComplete,
    onChange: (e) => defaultChangeHandler(ref, e),
  };

  function defaultChangeHandler(ref, event) {
    !!onChange && onChange();

    ref.current.value = event.target.value;
  }

  return (
    <div key={id} className={classes.inputWrapper}>
      <TextField {...prefs} />
    </div>
  );
}