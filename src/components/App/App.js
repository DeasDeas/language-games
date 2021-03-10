import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Header } from "../Header/Header";
import { AuthSelection } from "../Auth/AuthSelection/AuthSelection";
import { AuthLogIn } from "../Auth/AuthLogIn/AuthLogIn";
import { AuthRegister } from "../Auth/AuthRegister/AuthRegister";
import { getUser } from "../../features/auth/authSlice";
import { MainMenu } from "../MainMenu/MainMenu";
import { GameWrapper } from "../GameWrapper/GameWrapper";

import "./App.css";
import { MuiThemeProvider } from "@material-ui/core";
import { mainTheme } from "../../mui/themes";

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
          <Header authCheckStatus={authCheckStatus} />
          <main className="contentWrapper">
            <Switch>
              <Route exact path="/">
                <MainMenu />
              </Route>
              <Route exact path="/auth">
                {!isAuthenticated ? <AuthSelection /> : <Redirect to={`/`} />}
              </Route>
              <Route path="/auth/login">
                {!isAuthenticated ? <AuthLogIn /> : <Redirect to={`/`} />}
              </Route>
              <Route path="/auth/register">
                {!isAuthenticated ? <AuthRegister /> : <Redirect to={`/`} />}
              </Route>
              <Route path="/game">
                <GameWrapper constructor={false} />
              </Route>
              <Route path="/game-constructor">
                {isAuthenticated ? (
                  <GameWrapper constructor={true} />
                ) : (
                  <Redirect to={`/`} />
                )}
              </Route>
            </Switch>
          </main>
          <footer></footer>
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
