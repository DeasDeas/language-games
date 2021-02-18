import React, { useEffect, useState } from "react";
import { GameManager } from "../GameManager/GameManager";
import { getData, readGameState } from "../../features/game/gameSlice";
import { useDispatch, useSelector } from "react-redux";

export const GameWrapper = (props) => {
  let dispatch = useDispatch();
  const [redFromLocal, setRedFromLocal] = useState(false);

  let userId = JSON.parse(window.localStorage.getItem("userId"));
  const game = useSelector((state) => state.game);
  const currentSessionId = window.location.pathname.match(/\d+$/)[0];
  const localState = JSON.parse(window.localStorage.getItem(`${currentSessionId}`));

  useEffect(() => {
    if (!redFromLocal && localState && (localState.userId === userId)) {
        setRedFromLocal(true);
        dispatch(readGameState(localState));
    }
    else if (!redFromLocal && game.dataStatus === "idle") {
      dispatch(getData({ sessionId: currentSessionId, userId: userId }));
      window.sessionStorage.setItem("current_session", `${currentSessionId}`);
      setRedFromLocal(false)
    } else {
      window.localStorage.setItem(currentSessionId, JSON.stringify(game));
    }
  });

  return redFromLocal ? <GameManager /> : <div></div>;
};
