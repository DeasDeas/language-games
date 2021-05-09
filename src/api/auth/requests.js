import axios from "axios";
import {AUTH_ROUTES} from "../routes";

export class AuthRequests {
	static async login({ username, email = "", password }) {
		return await axios
			.post(AUTH_ROUTES.login, {
				username: username,
				email: email,
				password: password,
			})
	}

	static async logout() {
		return await axios
			.post(AUTH_ROUTES.logout, {})
	}

	static async getUser() {
		return await axios
			.get(AUTH_ROUTES.getUser)
	}

	static async verify() {
		return await axios
			.post(AUTH_ROUTES.verify, {})
			.catch(async () => {
					return await axios
						.post(AUTH_ROUTES.refresh, {})
			});
	}

	static async register({ username, email, password1, password2 }) {
		return await axios
			.post(AUTH_ROUTES.register, {
				username: username,
				email: email,
				password1: password1,
				password2: password2
			})
	}

	static async passwordChange({ newPassword, confirmPassword }) {
		return await axios
			.post(AUTH_ROUTES.passwordChange, {
				new_password1: newPassword,
				new_password2: confirmPassword
			})
	}

	static async passwordReset({ email }) {
		return await axios
			.post(AUTH_ROUTES.passwordReset, {
				email: email,
			})
	}

	static async passwordResetConfirm({ newPassword, confirmPassword, uid, token }) {
		return await axios
			.post(AUTH_ROUTES.passwordResetConfirm, {
				new_password1: newPassword,
				new_password2: confirmPassword,
				uid: uid,
				token: token
			})
	}
}