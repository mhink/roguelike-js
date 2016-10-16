import { put, call } from "redux-saga/effects";
import player from "res/Player0.png";
import floor from "res/Floor.png";

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
  yield put({ type:    "REGISTER_IMAGE", payload: {
    path:    player,
    img:     yield call(loadTileset, player),
    sWidth:  16,
    sHeight: 16
  } });

  yield put({ type:    "REGISTER_IMAGE", payload: {
    path:    floor,
    img:     yield call(loadTileset, floor),
    sWidth:  16,
    sHeight: 16
  } });

  yield put({ type:    "REGISTER_TILE", payload: {
    name:  "player",
    image: player,
    sx0:   0,
    sy0:   0
  } });

  yield put({ type:    "REGISTER_TILE", payload: {
    name:  "grass",
    image: floor,
    sx0:   8,
    sy0:   7
  } });

  yield put({ type:    "REGISTER_TILE", payload: {
    name:  "woodfloor",
    image: floor,
    sx0:   8,
    sy0:   19
  } });
  yield put({ type:    "REGISTER_TILE", payload: {
    name:  "woodfloor-dark",
    image: floor,
    sx0:   8,
    sy0:   22
  } });

};
