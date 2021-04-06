import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { getUser } from "../../features/auth/authSlice";

import "./styles.css";
import { MuiThemeProvider } from "@material-ui/core";
import { mainTheme } from "../../mui/themes";
import { Auth } from "../Auth";
import { paths } from "../../vars/paths";
import {TemplatePage} from "../../pages/TemplatePage";
import {MainPage} from "../../pages/MainPage";
import {GamesPage} from "../../pages/GamesPage";

const App = () => {
  const dispatch = useDispatch();
  const authCheckStatus = useSelector((state) => state.auth.status);
  const isAuthenticated = useSelector((state) => state.auth.authenticated);

  useEffect(() => {
    authCheckStatus === "idle" && dispatch(getUser());
  });

  return (
    <MuiThemeProvider theme={mainTheme}>
      <Router>
        <div className="App">
          <TemplatePage>
          <Auth />
            <Switch>
              <Route exact path="/">
                <MainPage/>
              </Route>
              <Route path={paths.gamesPage}>
	              <GamesPage/>
              </Route>
            </Switch>
          </TemplatePage>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
