import React from "react";
import { Header } from "../../components/Header";
import { Box } from "@material-ui/core";
import classes from "./styles.module.css";
import { Footer } from "../../components/Footer";
import { paths } from "../../vars/paths";
import {useSelector} from "react-redux";

export const testData = {
  pictureItems: {
    byIds: {
      "item-1": {
        id: "item-1",
        image: null,
        word: "word1",
        type: "all",
      },
      "item-2": {
        id: "item-2",
        image: null,
        word: "word2",
        type: "all",
      },
      "item-3": {
        id: "item-3",
        image: null,
        word: "word3",
        type: "all",
      },
      "item-4": {
        id: "item-4",
        image: null,
        word: "word4",
        type: "all",
      },
      "item-5": {
        id: "item-5",
        image: null,
        word: "word5",
        type: "all",
      },
      "item-6": {
        id: "item-6",
        image: null,
        word: "word6",
        type: "all",
      },
      "item-7": {
        id: "item-7",
        image: null,
        word: "word7",
        type: "all",
      },
      "item-8": {
        id: "item-8",
        image: null,
        word: "word8",
        type: "all",
      },
    },
    allIds: [
      "item-1",
      "item-2",
      "item-3",
      "item-4",
      "item-5",
      "item-6",
      "item-7",
      "item-8",
    ],
  },
};

export const TemplatePage = (props) => {

  const headerItems = [
      { name: "home", path: "/" },
      { name: "games", path: paths.gamesPage },
    ],
    headerProps = {
      menuLinks: headerItems,
      user: useSelector(state => state.auth.user),
    };

  return (
    <Box>
      <Header {...headerProps} />
      <main className={`${classes.outerWrapper} background_secondary`}>
        <Box className={`${classes.innerWrapper}`}>{props.children}</Box>
      </main>
      <Footer />
    </Box>
  );
};