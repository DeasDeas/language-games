import React from 'react';
import { NavLink } from "react-router-dom";

import classes from './Nav.module.css'

export const Nav = () => {

	return (
		<nav className={classes.Nav}>
			<ul className={classes.NavList}>
				<NavLink className={classes.NavList__item} to={"/"}><li>home</li></NavLink>
				<li className={classes.NavList__item}>something</li>
				<li className={classes.NavList__item}>something1</li>
			</ul>
		</nav>
	)
}