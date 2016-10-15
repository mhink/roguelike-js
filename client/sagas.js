import { v4 as uuid } from "uuid";
import { takeEvery, channel } from "redux-saga";
import { put, fork, call } from "redux-saga/effects";

import { initTilesets } from "features/tilesets/sagas";
import { rawKeyboardChannel, takeEveryAsCommand } from "keyboard-saga-helpers";
import { ipcChannel, takeEveryIpc } from "ipc-saga-helpers";
import runCommandSaga from "commands";

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
    type:    "SPAWN_ENTITY",
    payload: {
      uuid:     uuid(),
      player:   true,
      position: { x: 4, y: 4 },
      tileName: "player"
    }
  });

  yield put({ type: "START_RENDERING" });
}
