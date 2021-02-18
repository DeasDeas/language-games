import React from "react";
import classes from "./CardFrame.module.css"

export const CardFrame = (props) => {
	return (
		<div className={classes.CardFrame}>
			{props.children}
		</div>
	)
}