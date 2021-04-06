import React from "react";
import Box from "@material-ui/core/Box";
import classes from "./styles.module.css";
import "../styles.css";
import Typography from "@material-ui/core/Typography";
import { paths } from "../../vars/paths";
import Card from "@material-ui/core/Card";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { testData } from "../TemplatePage";
import { GamesSelector } from "../../containers/GamesSelector";
import { GameItemPage } from "./GameItemPage";

export const GamesPage = () => {
  let history = useHistory();
  let { url } = useRouteMatch();

  const clickItemHandler = (e) => {
    history.push(e.target.getAttribute("data-location"));
  };

  return (
    <Switch>

      {[
          ...testData.picturesGameItems.allIds.map(
            (e) => testData.picturesGameItems.byIds[e]
          ).map((item) => (
          <Route path={url + paths.pictureGames + "/" + item.id} key={item.id}>
            <GameItemPage item={{...item, ...testData.gameItem}} />
          </Route>
        )),
          ...testData.wordsGameItems.allIds.map(
            (e) => testData.wordsGameItems.byIds[e]
          ).map((item) => (
          <Route path={url + paths.wordGames + "/" + item.id} key={item.id}>
            <GameItemPage item={{...item, ...testData.gameItem}} />
          </Route>
        )),
      ]},

      <Route path={url}>
        <Box className="templateA">
          <section className={`gridElement ${classes.description}`}>
            <Typography variant="h4" component="h1">
              Lorem Ipsum
            </Typography>
            <Typography variant="body1" component="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          </section>
          <section className={`gridElement ${classes.gamesSelector}`}>
            <Card
              data-location={url + paths.pictureGames}
              onClick={(e) => clickItemHandler(e)}
              className={classes.gameItem}
            ></Card>
            <Card
              data-location={url + paths.wordGames}
              onClick={(e) => clickItemHandler(e)}
              className={classes.gameItem}
            ></Card>
          </section>
          <aside className={`gridElement ${classes.games}`}>
            <Typography variant="h5" component="h2">
              Dolor Sit Amet
            </Typography>
            <Typography variant="body2" component="p">
              Risus in hendrerit gravida rutrum. Tortor aliquam nulla facilisi
              cras. Semper viverra nam libero justo laoreet sit amet cursus sit.
              At risus viverra adipiscing at. Dignissim cras tincidunt lobortis
              feugiat vivamus at augue eget arcu. Elit duis tristique
              sollicitudin nibh. Sed libero enim sed faucibus turpis in.
              Fermentum odio eu feugiat pretium nibh ipsum. Vitae tempus quam
              pellentesque nec nam aliquam sem. Penatibus et magnis dis
              parturient montes nascetur ridiculus mus. Aliquam etiam erat velit
              scelerisque in. Euismod elementum nisi quis eleifend quam
              adipiscing vitae. Et netus et malesuada fames. Mi quis hendrerit
              dolor magna eget est.
            </Typography>
          </aside>

          <Switch>
            <Route path={url + paths.pictureGames}>
              <GamesSelector
                title={paths.pictureGames}
                items={testData.picturesGameItems.allIds.map(
                  (e) => testData.picturesGameItems.byIds[e]
                )}
              />
            </Route>
            <Route path={url + paths.wordGames}>
              <GamesSelector
                title={paths.wordGames}
                items={testData.wordsGameItems.allIds.map(
                  (e) => testData.wordsGameItems.byIds[e]
                )}
              />
            </Route>
          </Switch>

        </Box>
      </Route>
    </Switch>
  );
};