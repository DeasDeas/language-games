import React from 'react';
import { NavLink } from "react-router-dom";

import { AuthButton } from "../AuthButton/AuthButton";

import classes from '../Auth.module.css'

export const AuthSelection = () => {

	return (
		<form className={classes.Frame}>
			<p>Войдите в систему или зарегистрируйтесь:</p>
			<div>
				<NavLink to="/auth/login">
					<AuthButton styleClasses={classes.SingInButton}>
						Log In
					</AuthButton>
				</NavLink>
				<NavLink to="/auth/register">
					<AuthButton>
						Register
					</AuthButton>
				</NavLink>
			</div>
		</form>
	)
}