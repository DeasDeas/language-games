import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { MenuItem } from "./MenuItem/MenuItem";
import {
  getUsersSessions,
  getDefaultSessions,
} from "../../features/task/taskSlice";

import classes from "./MainMenu.module.css";
import { Button } from "../../mui/themes";
import Paper from "@material-ui/core/Paper";

export const MainMenu = () => {
  const dispatch = useDispatch();
  const { userSessionStatus, defaultSessionStatus } = useSelector(
    (state) => state.tasks
  );
  const sessions = useSelector((state) => state.tasks.sessions);
  const currentUser = useSelector((state) => state.auth.user.pk);
  const isAuthenticated = currentUser !== -1;
  const history = useHistory();

  useEffect(() => {
    // defaultSessionStatus === "idle" && dispatch(getDefaultSessions());
    isAuthenticated &&
      userSessionStatus === "idle" &&
      dispatch(getUsersSessions(currentUser));
  }, []);

  const handleItemClick = (session) => {
    history.push(`/game/${session.id}`);
  };

  return (
    <Paper className={classes.MainMenuFrame} elevation={3}>
      {sessions.map((session, idx) => {
        return (
          <div key={`menuItem${idx}`} className={classes.ItemWrapper}>
            <button onClick={() => handleItemClick(session)}>
              <MenuItem>
                <span>{session.name}</span>
              </MenuItem>
            </button>
            {isAuthenticated && <ChangeButton sessionId={session.id} />}
          </div>
        );
      })}
    </Paper>
  );
};

const ChangeButton = (props) => {
  const history = useHistory();
  const handleItemChangeClick = (sessionId) => {
    history.push(`game-constructor/${sessionId}`);
  };

  return (
    <Button
      variant="contained"
      color="orange"
      onClick={() => handleItemChangeClick(props.sessionId)}
    >
      <CreateOutlinedIcon />
    </Button>
  );
};
