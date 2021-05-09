import React from "react";

export const defaultGameContext = {
	gameContextValue: {
		setId: null,
		selectedItemId:null,
		controlsAccess: false,
	},
	setGameContextValue: () => {},
}

export const GameContext = React.createContext(defaultGameContext);