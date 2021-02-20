import React, { useEffect, useState } from "react";
import { GameManager } from "../GameManager/GameManager";
import { getData, readGameState } from "../../features/game/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";

export const GameWrapper = () => {
  const dispatch = useDispatch();
  const [hasSessionDataReceived, setHasSessionDataReceived] = useState(false);
  const userId = window.localStorage.getItem("userId");
  const game = useSelector((state) => state.game);
  const currentSessionId = window.location.pathname.match(/\d+$/)[0];

  function getUsersList() {
    return JSON.parse(window.sessionStorage.getItem("users"));
  }

  function refreshHandler() {
    return dispatch(
      getData({
        sessionId: currentSessionId,
        sessionInstance: getSessionInstance(userId, currentSessionId),
        userId: userId,
      })
    );
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getSessionInstance(userId, currentSessionId) {
    let usersList = getUsersList();
    if (
      !usersList ||
      !usersList[userId] ||
      !usersList[userId][currentSessionId]
    ) {
      prepareSessionInstance(userId, currentSessionId);
      usersList = getUsersList();
    }

    return usersList[userId][currentSessionId];
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function prepareSessionInstance(userId, currentSessionId) {
    let usersList = getUsersList();

    function fetchSessionData() {
      dispatch(
        getData({
          sessionId: currentSessionId,
          sessionInstance: usersList[userId][currentSessionId],
        })
      );
    }

    if (!usersList || !usersList[userId]) {
      usersList = !usersList ? {} : usersList;
      usersList[userId] = { [currentSessionId]: nanoid(5) };
    } else if (!usersList[userId][currentSessionId]) {
      usersList[userId][currentSessionId] = nanoid(5);
    }

    fetchSessionData();
    setHasSessionDataReceived(false);
    window.sessionStorage.setItem("users", JSON.stringify(usersList));
  }

  useEffect(() => {
    let sessionInstance = getSessionInstance(userId, currentSessionId);
    const sessionState = JSON.parse(
      window.sessionStorage.getItem(sessionInstance)
    );

    if (!hasSessionDataReceived && sessionState) {
      setHasSessionDataReceived(true);
      dispatch(readGameState(sessionState));
    } else if (!hasSessionDataReceived && game.dataStatus === "idle") {
      prepareSessionInstance(userId, currentSessionId);
    } else {
      window.sessionStorage.setItem(sessionInstance, JSON.stringify(game));
    }
  }, [getSessionInstance, userId, currentSessionId, hasSessionDataReceived, game, dispatch, prepareSessionInstance]);

  return hasSessionDataReceived ? (
    <GameManager refreshHandler={refreshHandler} />
  ) : (
    <div>{hasSessionDataReceived}</div>
  );
};
