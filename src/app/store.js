import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import tasksReducer from "../features/task/taskSlice";
import gameReducer from "../features/game/gameSlice";

export default configureStore({
	reducer: {
		auth: authReducer,
		tasks: tasksReducer,
		game: gameReducer,
	}
})
