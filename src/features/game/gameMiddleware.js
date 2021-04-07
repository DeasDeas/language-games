import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";
import { ITEM_STATUS } from "../../constants";

export const getData = createAsyncThunk(
	"game/getData",
	async ({ sessionId, sessionInstance }) => {
		const state = {
			session: sessionId,
			sets: null,
			pictures: null,
			results: {},
		};

		const sets = await axios
			.get(`/api/session-id/${sessionId}/sets/`)
			.then((response) => {
				let res = [...response.data];
				return (state.sets = {
					byId: res.reduce((accumulator, currentValue) => {
						currentValue.picturesOrder = [];
						accumulator[currentValue.id] = currentValue;
						return accumulator;
					}, {}),
					allIds: res.map((element) => element.id),
				});
			});

		const pictures = await axios
			.get(`/api/session-id/${sessionId}/pictures/`)
			.then((response) => {
				let res = [...response.data];
				return (state.pictures = {
					byId: res.reduce((accumulator, currentValue) => {
						accumulator[currentValue.id] = currentValue;
						return accumulator;
					}, {}),
					allIds: res.map((element) => element.id),
				});
			});

		const setsIds = sets.allIds;
		const picturesIds = pictures.allIds;


		setsIds.forEach((setId) => {
			sets.byId[setId] = {
				id: sets.byId[setId].id,
				name: sets.byId[setId].name,
				repeatable: sets.byId[setId].repeatable,
				picturesOrder: [],
				wordsOrder: [],
				completed: false,
				status: ITEM_STATUS.INITIAL,
			};
		});

		picturesIds.forEach((pictureId) => {
			const picture = pictures.byId[pictureId];
			const set = sets.byId[picture.set];
			picture.status = ITEM_STATUS.INITIAL;

			set.picturesOrder.splice(picture.pos - 1, 1, pictureId);

			set.wordsOrder.push(picture.word);
		});

		setsIds.forEach((setId) => {
			const set = sets.byId[setId]

			set.wordsOrder = _.shuffle(set.wordsOrder);

			state.results[setId] = Array(set.picturesOrder.length).fill({
				word: null,
				correct: null,
			});
		});

		sessionInstance && window.sessionStorage.setItem(sessionInstance, JSON.stringify(state));

		return state;
	}
);


export const sendData = createAsyncThunk(
	"game/sendData",
	async ({state, userId}) => {

		for (const setId of state.deletedSets) {
			await axios.delete(`/api/set/${setId}/`);
		}

		for (const setId of state.addedSets) {
			const set = {
				name: setId,
				max_size: 8,
				session: state.session,
				theme: 1,
				owner: userId,
				repeatable: 3,
			};

			await axios.post(`/api/sets/`, set);
		}

		for (const pictureId of state.deletedPictures) {
			await axios.delete(`/api/picture/${pictureId}/`)
		}

		for (const pictureId of state.changedPictures) {
			const picture = {
				...state.pictures.byId[pictureId]
			}

			delete picture.id;
			delete picture.status;

			await axios.put(`/api/picture/${pictureId}/`, picture)
		}

		for (const pictureId of state.addedPictures) {
			const picture = {
				...state.pictures.byId[pictureId]
			}

			delete picture.id;
			delete picture.status;

			console.log(picture)
			await axios.post(`/api/pictures/`, picture)
		}

		return state;
	}
)