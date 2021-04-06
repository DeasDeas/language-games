import React from "react";
import classes from "./styles.module.css";
import TextField from "@material-ui/core/TextField";
import {Frame} from "../Frame";
import {Box} from "@material-ui/core";

export const Form = (props) => {
  const { form } = props;

  return (
    <Frame className={classes.form}>
      <div className={classes.formContent}>
        {createForm(form)}
        {props.children}
      </div>
    </Frame>
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
    <Box key={id} className={classes.inputWrapper}>
      <TextField {...prefs} />
    </Box>
  );
}