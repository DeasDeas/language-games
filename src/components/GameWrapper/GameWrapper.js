import React, { useEffect, useState } from "react";
import { GameManager } from "../GameManager/GameManager";
import { getData, readGameState } from "../../features/game/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";

export const GameWrapper = (props) => {
  let dispatch = useDispatch();
  const [redFromLocal, setRedFromLocal] = useState(false);

  const userId = window.localStorage.getItem("userId");
  const game = useSelector((state) => state.game);
  const currentSessionId = window.location.pathname.match(/\d+$/)[0];

  const refreshHandler = () => {
    dispatch(
      getData({
        sessionId: currentSessionId,
        sessionInstance: getSessionInstance(userId, currentSessionId),
        userId: userId,
      })
    );
  };

  function getSessionInstance(userId, currentSessionId) {
    let usersList = JSON.parse(window.localStorage.getItem("users"));

    if (!usersList) {
      usersList = {};
      usersList[userId] = { [currentSessionId]: nanoid(5) };
      window.localStorage.setItem("users", JSON.stringify(usersList));
      dispatch(
        getData({
          sessionId: currentSessionId,
          sessionInstance: usersList[userId][currentSessionId],
        })
      );
    }

    let userInstanceList = usersList[userId];

    if (!userInstanceList) {
      usersList[userId] = { [currentSessionId]: nanoid(5) };
      window.localStorage.setItem("users", JSON.stringify(usersList));
      dispatch(
        getData({
          sessionId: currentSessionId,
          sessionInstance: usersList[userId][currentSessionId],
        })
      );
      userInstanceList = usersList[userId];
    }

    let instanceId = userInstanceList[currentSessionId];

    if (!instanceId) {
      userInstanceList[currentSessionId] = nanoid(5);
      window.localStorage.setItem("users", JSON.stringify(usersList));
      dispatch(
        getData({
          sessionId: currentSessionId,
          sessionInstance: userInstanceList[currentSessionId],
        })
      );
    }

    return userInstanceList[currentSessionId];
  }

  useEffect(() => {
    let sessionInstance = getSessionInstance(userId, currentSessionId);
    let localState = JSON.parse(window.sessionStorage.getItem(sessionInstance));

    if (!redFromLocal && localState) {
      setRedFromLocal(true);
      dispatch(readGameState(localState));
    } else if (!redFromLocal && game.dataStatus === "idle") {
      setRedFromLocal(false);
      dispatch(
        getData({
          sessionId: currentSessionId,
          sessionInstance: sessionInstance,
          userId: userId,
        })
      );
    } else {
      window.sessionStorage.setItem(sessionInstance, JSON.stringify(game));
    }
  });

  return redFromLocal ? (
    <GameManager refreshHandler={refreshHandler} />
  ) : (
    <div>{redFromLocal}</div>
  );
};
