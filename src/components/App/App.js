import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles.css";
import { MuiThemeProvider } from "@material-ui/core";
import { mainTheme } from "../../mui/themes";
import { paths } from "../../vars/paths";
import { TemplatePage } from "../../pages/TemplatePage";
import { MainPage } from "../../pages/MainPage";
import { GamesPage } from "../../pages/GamesPage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {AuthPage} from "../../pages/AuthPage";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <MuiThemeProvider theme={mainTheme}>
        <Router>
          <div className="App">
            <TemplatePage>
              <Switch>
                <Route exact path="/">
                  <MainPage />
                </Route>
                <Route path={paths.gamesPage}>
                  <GamesPage />
                </Route>
                <Route path={paths.auth}>
                  <AuthPage />
                </Route>
              </Switch>
            </TemplatePage>
          </div>
        </Router>
      </MuiThemeProvider>
    </DndProvider>
  );
};

export default App;
