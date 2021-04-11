import React from "react";

export const defaultAnimationContextValue = {
	toggleAnimation: (timeout) => (setAnimate) => (callback = () => {}) => {
		console.log(timeout)
		setAnimate(false);
		setTimeout(() => {
			setAnimate(true);
			return callback();
		}, timeout);
	},
};

export const AnimationContext = React.createContext({
	animationContextValue: defaultAnimationContextValue,
	setAnimationContext: () => {},
});