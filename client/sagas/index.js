import { v4 as uuid } from "uuid";
import { takeEvery, channel } from "redux-saga";
import { put, fork, call } from "redux-saga/effects";

import { rawKeyboardChannel, takeEveryAsCommand } from "keyboard-saga-helpers";
import { ipcChannel, takeEveryIpc } from "ipc-saga-helpers";
import runCommandSaga from "sagas/commands";
import { spawnEntity } from "spawn-entity-action";
import { createMap } from "features/maps";
import {
  registerImage,
  registerTile,
  batchRegisterTiles
} from "features/tilesets";
import player from "res/Player0.png";
import floor from "res/Floor.png";
import floorTiledefs from "res/Floor.tiledefs.js";
import loadImage from "./load-image-promise.js"

function* logIpc(...args) {
  console.log(args);
}

function* initializeGame() {
  const playerImage = yield call(loadImage, player);
  const floorImage = yield call(loadImage, floor);
  yield put(registerImage(player, playerImage, 16, 16));
  yield put(registerImage(floor, floorImage, 16, 16));
  yield put(registerTile("player", 0, 0, player));
  yield put(batchRegisterTiles(floor, floorTiledefs));
  yield put(createMap("grass-night", 15, 15));
  yield put(spawnEntity({
    player:   true,
    position: { x: 7, y: 7},
    tileName: "player"
  }));
}

export default function* rootSaga(canvas) {
  const rkChan = yield rawKeyboardChannel(canvas);
  const ipcChan = yield ipcChannel("ipc-saga");

  yield [
    fork(takeEveryAsCommand, rkChan, runCommandSaga),
    fork(takeEveryIpc, ipcChan, logIpc),
  ];

  yield* initializeGame();

  yield put({ type: "START_RENDERING" });
}
