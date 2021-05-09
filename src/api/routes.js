
const authPrefix = "/dj-rest-auth";
export const AUTH_ROUTES = {
	login: `${authPrefix}/login/`,
	logout: `${authPrefix}/logout/`,
	getUser: `${authPrefix}/user/`,
	register: `${authPrefix}/registration/`,
	verify: `${authPrefix}/token/verify/`,
	refresh: `${authPrefix}/token/refresh/`,
	passwordChange: `${authPrefix} password/change/`,
	passwordReset: `${authPrefix}/password/reset/`,
	passwordResetConfirm: `${authPrefix}/password/reset/confirm/`,
}

const apiPrefix = "/api";
export const ITEMS_ROUTES = {
	items: `${apiPrefix}/items/`,
	itemTypes: `${apiPrefix}/item-types/`
}