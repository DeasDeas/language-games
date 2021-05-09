import React, {useEffect} from "react";
import classes from "./styles.module.css";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { Avatar, makeStyles } from "@material-ui/core";
import { paths } from "../../vars/paths";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { logout } from "../../features/auth/middleware";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  link: {
    ...theme.typography.subtitle1,
  },
  logout: {
    ...theme.typography.body2,
  },
  name: {
    ...theme.typography.h6,
    lineHeight: 1,
  },
}));

export const Header = ({ menuLinks, user }) => {
  const mui = useStyles(),
    isAuthenticated = !!user.id,
    dispatch = useDispatch(),
    history = useHistory();

  const { pathname: url } = useLocation();

  return (
    <header className={`outerWrapper ${classes.header} background_primary`}>
      <Box className={`innerWrapper ${classes.headerInner}`}>
        <nav>
          <ul className={classes.navigationWrapper}>
            {menuLinks &&
              menuLinks.map((item) => {
                return (
                  <li id={`${item.name}`} key={item.name}>
                    <NavLink className={mui.link} to={`${item.path}`}>
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </nav>
        <Box className={isAuthenticated ? classes.profile : classes.login}>
          {isAuthenticated
            ? [
                <Avatar
                  className={classes.avatar}
                  alt={user.username}
                  src={user.avatar}
                  key={"a-1"}
                />,
                <Typography
                  className={`${mui.name} ${classes.name}`}
                  variant="h6"
                  component="span"
                  key={"a-2"}
                >
                  {_.capitalize(user.username)}
                </Typography>,
                <Link
                  className={`${mui.logout} ${classes.logout}`}
                  onClick={() => {
                    window.confirm("Вы точно хотите выйти из аккаунта?") &&
                      dispatch(logout()) &&
                      history.replace("/");
                  }}
                  key={"a-3"}
                >
                  logout
                </Link>,
              ]
            : !(paths.auth === url) && (
                <NavLink to={paths.auth}>
                  <Button variant="outlined" color="primary">
                    {!RegExp(paths.auth).test(url) ? "Войти" : "Назад"}
                  </Button>
                </NavLink>
              )}
        </Box>
      </Box>
    </header>
  );
};