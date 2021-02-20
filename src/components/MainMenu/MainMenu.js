import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { MainMenuFrame } from "./MainMenuFrame/MainMenuFrame";
import { MenuItem } from "./MenuItem/MenuItem";
import {
  getUsersSessions,
  getDefaultSessions,
} from "../../features/task/taskSlice";

export const MainMenu = () => {
  const dispatch = useDispatch();
  const { userSessionStatus, defaultSessionStatus } = useSelector(
    (state) => state.tasks
  );
  const isAuthenticated = useSelector((state) => state.auth.user.pk) !== -1;
  const sessions = useSelector((state) => state.tasks.sessions);
  const currentUser = useSelector((state) => state.auth.user.pk);
  const history = useHistory();

  useEffect(() => {
    defaultSessionStatus === "idle" && dispatch(getDefaultSessions());
    isAuthenticated &&
      userSessionStatus === "idle" &&
      dispatch(getUsersSessions(currentUser));
  });

  const handleClick = (session) => {
    history.push(`/game/${session.id}`);
  };

  return (
    <MainMenuFrame>
      {sessions.map((session, idx) => {
        return (
          <button key={`menuItem${idx}`} onClick={() => handleClick(session)}>
            <MenuItem>
              <span>{session.name}</span>
            </MenuItem>
          </button>
        );
      })}
    </MainMenuFrame>
  );
};
