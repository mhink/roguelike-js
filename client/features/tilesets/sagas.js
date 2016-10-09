import { takeEvery } from "redux-saga";
import { select, put, call } from "redux-saga/effects";
import { map } from "lodash";

const loadTileset = (path) => (
  new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.addEventListener("load", () => {
        resolve(img);
      });
      img.src = path;
    } catch (err) {
      reject(err);
    }
  })
);

export const initTileset = function* ({ payload }) {
  const { path } = payload;
  const img = yield call(loadTileset, path);
  yield put({ type: "LOADED_IMAGE", payload: {
    path,
    img
  }});
};

export const tilesetLoader = function* () {
  yield takeEvery("REGISTER_IMAGE", initTileset);
}

import player from "res/Player0.png";
import floor from "res/Floor.png";

export const initTilesets = function* () {
  yield put({type: "REGISTER_IMAGE", payload: { 
    path: player,
    sWidth: 16,
    sHeight: 16
  }});
  yield call(initTileset, { payload: { path: player }});

  yield put({type: "REGISTER_IMAGE", payload: {
    path: floor,
    sWidth: 16,
    sHeight: 16
  }});
  yield call(initTileset, { payload: { path: floor}});

  yield put({type: "REGISTER_TILE", payload: {
    name: "player",
    image: player,
    sx0: 0,
    sy0: 0,
  }});

  yield put({type: "REGISTER_TILE", payload: {
    name: "grass",
    image: floor,
    sx0: 8,
    sy0: 7,
  }});
}
