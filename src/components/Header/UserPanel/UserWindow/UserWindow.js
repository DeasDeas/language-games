import React from "react";
import classes from "./UserWindow.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../features/auth/authSlice";
import { useHistory } from "react-router-dom";

export const UserWindow = () => {
  const user = useSelector((state) => state.auth.user);
  let history = useHistory();
  const dispatch = useDispatch();

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
        <span className={classes.userName}>{user.username}</span>
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
