import React, { useCallback, useEffect, useState } from "react";
import { GameManager } from "../GameManager/GameManager";
import { readGameState } from "../../features/game/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { getData } from "../../features/thunks/gameMiddleware";

export const GameWrapper = (props) => {
  const dispatch = useDispatch();
  const [hasSessionDataReceived, setHasSessionDataReceived] = useState(false);
  const userId = window.localStorage.getItem("userId");
  const game = useSelector((state) => state.game);
  const dataStatus = useSelector((state) => state.game.dataStatus);
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

  let prepareSessionInstance = useCallback(
    (userId, currentSessionId) => {
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
    },
    [dispatch]
  );

  let getSessionInstance = useCallback(
    (userId, currentSessionId) => {
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
    },
    [prepareSessionInstance]
  );

  useEffect(() => {
    if (props.constructor && dataStatus === "idle") {
      dispatch(
        getData({
          sessionId: currentSessionId,
        })
      );
      dataStatus === "succeeded" && setHasSessionDataReceived(true);
    }
    else if (props.constructor && dataStatus === "succeeded") {
      setHasSessionDataReceived(true);
    }

    if (!props.constructor) {
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
    }
  }, [
    currentSessionId,
    dataStatus,
    dispatch,
    game,
    getSessionInstance,
    hasSessionDataReceived,
    prepareSessionInstance,
    userId,
    props.constructor,
  ]);

  return hasSessionDataReceived ? (
    <div>
      <GameManager
        constructor={props.constructor}
        refreshHandler={refreshHandler}
      />
    </div>
  ) : (
    <div>{hasSessionDataReceived}</div>
  );
};