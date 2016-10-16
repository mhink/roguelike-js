import { put, call } from "redux-saga/effects";
import player from "res/Player0.png";
import floor from "res/Floor.png";
import {
  registerImage,
  registerTile
} from "features/tilesets";

const loadTileset = (path) => new Promise((resolve, reject) => {
  try {
    const img = new Image();
    img.addEventListener("load", () => {
      resolve(img);
    });
    img.src = path;
  } catch (err) {
    reject(err);
  }
});

export const initTilesets = function* () {
  yield put(registerImage(
    player,
    yield call(loadTileset, player),
    16, 16
  ));

  yield put(registerImage(
    floor,
    yield call(loadTileset, floor),
    16, 16
  ));

  yield put(registerTile(
    "player",
    player,
    0, 0
  ));

  yield put(registerTile(
    "grass",
    floor,
    8, 7
  ));

  yield put(registerTile(
    "woodfloor",
    floor,
    8, 19
  ));

  yield put(registerTile(
    "woodfloor-dark",
    floor,
    8, 22
  ));
};
