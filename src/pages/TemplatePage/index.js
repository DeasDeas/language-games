import React from "react";
import { Header } from "../../components/Header";
import { Box } from "@material-ui/core";
import classes from "./styles.module.css";
import { Footer } from "../../components/Footer";
import { paths } from "../../vars/paths";
import { GAME_TYPES } from "../../vars/consts";

export const testData = {
  users: {
    byIds: {
      1: {
        id: 1,
        name: "Michael",
        avatar:
          "https://icdn.lenta.ru/images/2020/01/30/12/20200130125436054/pwa_vertical_1280_069d5f02ffba7876675992018a16ae7d.jpg",
      },
      2: {
        id: 2,
        name: "TestUser_I",
        avatar: "none",
      },
      3: {
        id: 3,
        name: "TestUser_II",
        avatar: "none",
      },
    },
    allIds: ["1", "2", "3"],
  },
  picturesGameItems: {
    byIds: {
      "item-1": {
        id: "item-1",
        name: "Picture Task 1",
        type: GAME_TYPES.PICTURES,
      },
      "item-2": {
        id: "item-2",
        name: "Picture Task 2",
        type: GAME_TYPES.PICTURES,
      },
      "item-3": {
        id: "item-3",
        name: "Picture Task 3",
        type: GAME_TYPES.PICTURES,
      },
    },
    allIds: ["item-1", "item-2", "item-3"],
  },
  gameItem: {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ownerId: 1,
  },
  wordsGameItems: {
    byIds: {
      "item-4": {
        id: "item-4",
        name: "Word Task 1",
        type: GAME_TYPES.WORDS,
      },
      "item-5": {
        id: "item-5",
        name: "Word Task 2",
        type: GAME_TYPES.WORDS,
      },
      "item-6": {
        id: "item-6",
        name: "Word Task 3",
        type: GAME_TYPES.WORDS,
      },
      "item-7": {
        id: "item-7",
        name: "Word Task 4",
        type: GAME_TYPES.WORDS,
      },
      "item-8": {
        id: "item-8",
        name: "Word Task 5",
        type: GAME_TYPES.WORDS,
      },
      "item-9": {
        id: "item-9",
        name: "Word Task 6",
        type: GAME_TYPES.WORDS,
      },
      "item-10": {
        id: "item-10",
        name: "Word Task 7",
        type: GAME_TYPES.WORDS,
      },
      "item-11": {
        id: "item-11",
        name: "Word Task 8",
        type: GAME_TYPES.WORDS,
      },
      "item-12": {
        id: "item-12",
        name: "Word Task 9",
        type: GAME_TYPES.WORDS,
      },
    },
    allIds: [
      "item-4",
      "item-5",
      "item-6",
      "item-7",
      "item-8",
      "item-9",
      "item-10",
      "item-11",
      "item-12",
    ],
  },
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
      user: testData.users.byIds[1],
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