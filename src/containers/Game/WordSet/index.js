import React from 'react';
import classes from '../styles.module.css';
import Box from "@material-ui/core/Box";
import {makeSelectSetItems} from "../../../features/game/selectors";
import {useSelector} from "react-redux";

export const WordSet = ({setId}) => {
	const selectedSetItems = React.useMemo(makeSelectSetItems, []),
		items = useSelector(state => selectedSetItems(state, setId));

	return (
		<Box className={classes.setWrapper}>
			WORD
		</Box>
	)
}