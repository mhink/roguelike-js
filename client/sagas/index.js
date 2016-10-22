/* eslint-disable no-magic-numbers */
import { put, fork, call } from "redux-saga/effects";

import { rawKeyboardChannel, takeEveryAsCommand } from "keyboard-saga-helpers";
import { ipcChannel, takeEveryIpc } from "ipc-saga-helpers";
import runCommandSaga from "sagas/commands";
import runEventSaga from "sagas/events";
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
import loadImage from "./load-image-promise.js";

const logIpc = function* (...args) {
  // eslint-disable-next-line no-console
  yield call([console, console.log], args);
};

const initializeGame = function* () {
  const playerImage = yield call(loadImage, player);
  const floorImage = yield call(loadImage, floor);
  yield put(registerImage(player, playerImage, { x: 16, y: 16 }));
  yield put(registerImage(floor, floorImage, { x: 16, y: 16 }));
  yield put(registerTile("player", { x: 0, y: 0 }, player));
  yield put(registerTile("goblin", { x: 0, y: 13 }, player));
  yield put(batchRegisterTiles(floor, floorTiledefs));
  yield put(createMap("grass-night", 15, 15));
  yield put(spawnEntity({
    player:   true,
    position: { x: 7, y: 7 },
    tileName: "player",
    actor: {
      repeat:    true,
      speed:     10,
      eventType: "PLAYER_INPUT"
    }
  }));
  yield put(spawnEntity({
    position: { x: 9, y: 9 },
    tileName: "goblin",
    actor: {
      repeat:    true,
      speed:     7,
      eventType: "GOBLIN_AI"
    }
  }));
};

export default function* rootSaga(canvas) {
  const rkChan = yield rawKeyboardChannel(canvas);
  const ipcChan = yield ipcChannel("ipc-saga");

  yield* initializeGame();

  yield put({ type: "START_RENDERING" });
  yield [
    fork(takeEveryAsCommand, rkChan, runCommandSaga, runEventSaga),
    fork(takeEveryIpc, ipcChan, logIpc)
  ];
}
