import React from 'react';
import { AuthButton } from "../AuthButton/AuthButton";
import classes from '../Auth.module.css'
import { NavLink } from "react-router-dom";

export const AuthSelection = (props) => {

	return (
		<form className={classes.Frame}>
			<p>Войдите в систему или зарегистрируйтесь:</p>
			<div className={classes.AuthButton}>
				<NavLink to="/auth/login">
					<AuthButton styleClasses={classes.SingInButton}>
						Log In
					</AuthButton>
				</NavLink>
				<NavLink to="/auth/register">
					<AuthButton styleClasses={classes.RegisterButton}>
						Register
					</AuthButton>
				</NavLink>
			</div>
		</form>
	)
}