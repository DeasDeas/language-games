import React from 'react';
import { Frame } from "../../Frame/Frame";
import classes from "./MenuItem.module.css";

export const MenuItem = (props) => {

	return (
		<Frame styles={classes.MenuItem}>
			{props.children}
		</Frame>
	)
}