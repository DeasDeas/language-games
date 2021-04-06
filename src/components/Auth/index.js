import React from 'react';
import {Route, Switch} from "react-router-dom";
import {AuthSelection} from "./AuthSelection";
import {AuthLogIn} from "./AuthLogIn";
import {AuthRegister} from "./AuthRegister";
import { paths } from "../../vars/paths";

export const Auth = () => {

	return (
		<Switch>
			<Route exact path={paths.auth}>
				<AuthSelection/>
			</Route>
			<Route path={paths.login}>
				<AuthLogIn />
			</Route>
			<Route path={paths.register}>
				<AuthRegister />
			</Route>
		</Switch>
	)
}