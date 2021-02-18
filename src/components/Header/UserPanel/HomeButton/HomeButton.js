import React from "react";
import { Button } from "../../../Button/Button";
import classes from "../UserPanel.module.css"

export const HomeButton = () => {

	return (
		<Button design={{styleClasses: `${classes.UsePanelButton_green} ${classes.UsePanelButton}`}}>
			Home
		</Button>
	)
}