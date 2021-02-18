import React from 'react';
import classes from './Frame.module.css'

export const Frame = (props) => {
	return (
		<div className={`${classes.Frame} ${props.styles}`}>
			{props.children}
		</div>
	)
}