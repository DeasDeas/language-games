import React, { useEffect } from "react";
import classes from "./Header.module.css"
import { UserPanel } from "./UserPanel/UserPanel";
import { useSelector } from 'react-redux'
import { useLocation } from "react-router-dom"
import { Nav } from "./Nav/Nav";

export const Header = (props) => {
	const user = useSelector(state => state.auth.user);
	const currentRoute = useLocation();

	return (
			<div className={classes.Header}>
				<Nav/>
				<UserPanel user={user} currentRoute={currentRoute} />
			</div>
		)
}