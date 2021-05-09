import React from "react";

export const defaultAnimationContextValue = {
	toggleAnimation: (time) => (setAnimate) => (callback = () => {}) => {
		setAnimate(false);
		setTimeout(() => {
			setAnimate(true);
			return callback();
		}, time);
	}
};

export const AnimationContext = React.createContext({
	animationContextValue: defaultAnimationContextValue,
	setAnimationContext: () => {},
});