import React from "react";
import { Button } from "../../../Button/Button";
import classes from "../UserPanel.module.css"

export const LogInButton = (props) => {

	return (
		<Button design={{styleClasses: classes.UsePanelButton}}>
			Log In
		</Button>
	)
}