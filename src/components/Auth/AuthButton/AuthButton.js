import React from 'react';
import { Button } from "../../Button/Button";
import classes from "./AuthButton.module.css"

export const AuthButton = (props) => {

	return (
		<Button design={{styleClasses: `${props.styleClasses} ${classes.AuthButton}`}} type={props.type}>
			{props.children}
		</Button>
	)
}