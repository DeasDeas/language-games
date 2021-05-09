import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import classes from "../styles.module.css";
import { Button } from "../../../mui/themes";
import { Frame } from "../../Frame";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Fade from "@material-ui/core/Fade";

export const AuthSelection = (props) => {
  const [animate, setAnimate] = useState(false);

  React.useEffect(() => {
    !animate && props.toggleAnimation(setAnimate)();
  }, [animate]);

  return (
    <Fade in={animate}>
      <Box>
        <Frame className={classes.authSelection}>
          <Box className={classes.textWrapper}>
            <Typography variant="subtitle1" component="p">
              Войдите в систему или зарегистрируйтесь:
            </Typography>
          </Box>
          <Box>
            <NavLink className={classes.buttonWrapper} to="/auth/login">
              <Button variant="contained" color="green">
                Вход
              </Button>
            </NavLink>
            <NavLink className={classes.buttonWrapper} to="/auth/register">
              <Button variant="contained" color="orange">
                Регистрация
              </Button>
            </NavLink>
          </Box>
        </Frame>
      </Box>
    </Fade>
  );
};
