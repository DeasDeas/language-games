import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import "./styles.css";
import { MuiThemeProvider } from "@material-ui/core";
import { mainTheme } from "../../mui/themes";
import { Auth } from "../Auth";
import { paths } from "../../vars/paths";
import {TemplatePage} from "../../pages/TemplatePage";
import {MainPage} from "../../pages/MainPage";
import {GamesPage} from "../../pages/GamesPage";

const App = () => {

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
