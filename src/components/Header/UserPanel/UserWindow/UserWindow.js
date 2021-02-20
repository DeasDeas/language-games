import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"

import { logout } from "../../../../features/auth/authSlice";

import classes from "./UserWindow.module.css";

export const UserWindow = () => {
  const username = useSelector((state) => state.auth.user.username);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className={classes.userWrapper}>
      <img
        className={classes.userImage}
        src={
          "https://misfitsboxla.com/wp-content/uploads/2019/08/player_avatar.png"
        }
        alt={"user"}
      />
      <div className={classes.userInfoWrapper}>
        <span className={classes.userName}>{username}</span>
        <button
          onClick={async () => {
            await dispatch(logout());
            history.push("/");
            window.location.reload();
          }}
          className={classes.logout}
        >
          logout
        </button>
      </div>
    </div>
  );
};
