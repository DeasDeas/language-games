import {createAsyncThunk} from "@reduxjs/toolkit";
import {logout as logoutRequest} from "../../api/auth";

export const logout = createAsyncThunk(
	"auth/logout",
	async () => {
		return await logoutRequest();
	}
);