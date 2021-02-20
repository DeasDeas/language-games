import React from "react";
import { useLocation } from "react-router-dom"

import { UserPanel } from "./UserPanel/UserPanel";
import { Nav } from "./Nav/Nav";

import classes from "./Header.module.css"

export const Header = () => {
	const currentRoute = useLocation();

	return (
			<div className={classes.Header}>
				<Nav/>
				<UserPanel currentRoute={currentRoute} />
			</div>
		)
}