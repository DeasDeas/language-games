import React from 'react';
import {Box} from "@material-ui/core";
import classes from "./styles.module.css";
import AddIcon from '@material-ui/icons/Add';

export const ItemPlaceholder = ({selected, clickHandler}) => {
	const labelClasses = selected
		? `${classes.placeholder} ${classes.placeholder__selected}`
		: `${classes.placeholder}`;

	return (
		<Box className={labelClasses} id="add-item" onClick={clickHandler}>
			<AddIcon className={classes.addIcon}/>
		</Box>
	)
}