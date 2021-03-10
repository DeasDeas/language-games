import React from 'react';

import classes from './Frame.module.css'
import Paper from "@material-ui/core/Paper";

export const Frame = (props) => {
	return (
		<Paper variant={"outlined"} className={`${classes.Frame} ${props.styles}`}>
			{props.children}
		</Paper>
	)
}