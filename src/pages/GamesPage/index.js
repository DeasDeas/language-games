import React from "react";
import Box from "@material-ui/core/Box";
import classes from "./styles.module.css";
import "../styles.css";
import Typography from "@material-ui/core/Typography";
import { paths } from "../../vars/paths";
import Card from "@material-ui/core/Card";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { GamesSelector } from "../../containers/GamesSelector";
import { GameItemPage } from "./GameItemPage";
import { useDispatch, useSelector } from "react-redux";
import { selectSortedTasks } from "../../features/task/selectors";
import {  GAME_TYPES_PATHS, PAGE_STATE  } from "../../vars/consts";
import {  setPageState  } from "../../features/pageState";
import {  getTasks  } from "../../api/tasks";
import {  useFetchData  } from "../../features/hooks/useFetchData";
import {  setTask } from "../../features/task";
import {  selectCurrentUser } from "../../features/auth/selectors";

export const GamesPage = () => {
  let history = useHistory(),
    { url } = useRouteMatch();

  const user = useSelector(selectCurrentUser),
      filter = user.id ? `?ordering=-date_created&filters=(private%253Dfalse)%7C(owner%3D${user.id})` : ""

  useFetchData(() => getTasks(filter), setTask);

  const clickItemHandler = (e) => {
    history.push(e.target.getAttribute("data-location"));
    setGameState(PAGE_STATE.PREPARING);
  };

  const tasks = useSelector(selectSortedTasks),
    dispatch = useDispatch(),
    [setGameState] = [
      (pageState) =>
        dispatch(setPageState({ newState: pageState })),
    ];


  return (
    <Switch>
      {makeRoutesToInstances(tasks, url)}
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
            >{null}</Card>
            <Card
              data-location={url + paths.wordGames}
              onClick={(e) => clickItemHandler(e)}
              className={classes.gameItem}
            >{null}</Card>
          </section>
          <aside className={`gridElement ${classes.games}`}>
            <Typography variant="h5" component="h2">
              Dolor Sit Amet
            </Typography>
          </aside>

          <Switch>
            {makeRoutesToSelectors(tasks, url)}
          </Switch>
        </Box>
      </Route>
    </Switch>
  );
};

const makeRoutesToInstances = (tasks, url) => Object.keys(tasks).reduce(
  (combiner, type) => [
    ...combiner,
    ...tasks[type].map((item) => (
      <Route path={`${url}${GAME_TYPES_PATHS[type]}/${item.id}`} key={item.id}>
        <GameItemPage item={item}/>
      </Route>
    )),
  ],
  []
);

const makeRoutesToSelectors = (tasks, url) => Object.keys(tasks).reduce(
  (combiner, type) => [
    ...combiner,
    <Route path={url + GAME_TYPES_PATHS[type]} key={type}>
      <GamesSelector
        type={type}
        title={GAME_TYPES_PATHS[type]}
        items={tasks[type]}
      />
    </Route>
  ],
  []
);