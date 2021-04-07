import React from "react";

export const animations = {
  toggleAnimation: (timeout) => (setAnimate) => (callback = () => {}) => {
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true);
      return callback();
    }, timeout);
  },
};

export const AnimationContext = React.createContext({
  animations,
});