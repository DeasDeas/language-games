import React from "react";

import classes from "./Button.module.css";

export const Button = (props) => {
  const { styleClasses } = !!props.design && props.design;

  return (
    <button
      className={`${styleClasses} ${classes.button}`}
      type={props.type}
      disabled={props.disabled}
      onClick={props.click}
    >
      {props.children}
    </button>
  );
};
