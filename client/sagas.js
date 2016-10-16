import { v4 as uuid } from "uuid";
import { takeEvery, channel } from "redux-saga";
import { put, fork, call } from "redux-saga/effects";

import { initTilesets } from "init-tilesets";
import { rawKeyboardChannel, takeEveryAsCommand } from "keyboard-saga-helpers";
import { ipcChannel, takeEveryIpc } from "ipc-saga-helpers";
import runCommandSaga from "commands";
import { spawnEntity } from "spawn-entity-action";

function* logIpc(...args) {
  console.log(args);
}

export default function* rootSaga() {
  const rkChan = yield rawKeyboardChannel();
  const ipcChan = yield ipcChannel("ipc-saga");

  yield [
    fork(takeEveryAsCommand, rkChan, runCommandSaga),
    fork(takeEveryIpc, ipcChan, logIpc),
  ];

  yield call(initTilesets);
  yield put({
    type:    "CREATE_MAP",
    payload: {
      uuid:       uuid(),
      background: "woodfloor",
      dimensions: {
        x: 15,
        y: 15
      }
    }
  });
  yield put(spawnEntity({
    player:   true,
    position: { x: 7, y: 7},
    tileName: "player"
  }));

  yield put({ type: "START_RENDERING" });
}
