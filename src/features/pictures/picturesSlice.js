import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
	pictures: [
	],
	status: 'idle',
	error: null
}

export const fetchPictures = createAsyncThunk('pictures/fetchPictures', async () => {
	return await axios
		.get(`http://127.0.0.1:8000/lgback/pictures/`)
		.then(response => {
			return response.data
		})
})

export const addPicture = createAsyncThunk('pictures/addPicture', async picture => {
	return await axios
		.post(`http://127.0.0.1:8000/lgback/pictures/`,
			 picture)
		.then(response => {
			return response.data
		})
})

export const picturesSlice = createSlice({
	name: 'pictures',
	initialState,
	reducers: {
		picturesFetched(state, action) {
			state.pictures = action.payload
		}
	},
	extraReducers: {
		[addPicture.fulfilled]: (state, action) => {
			state.pictures = state.pictures.concat(action.payload)
		},
		[fetchPictures.pending]: (state, action) => {
			state.status = 'loading'
		},
		[fetchPictures.fulfilled]: (state, action) => {
			state.status = 'succeeded'
			// Add any fetched pictures to the array
			state.pictures = state.pictures.concat(action.payload)
		},
		[fetchPictures.rejected]: (state, action) => {
			state.status = 'failed'
			state.error = action.error.message
		}
	}
})


export const { pictureAdded } = picturesSlice.actions

export default picturesSlice.reducer

export const selectAllPictures = state => state.pictures
