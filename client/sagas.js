import { v4 as uuid } from "uuid";
import { takeEvery, channel } from "redux-saga";
import { put, fork, call } from "redux-saga/effects";

import { watchKeyboard } from "features/input/sagas";
import { initTilesets } from "features/tilesets/sagas";
import { ipcChannel, takeEveryIpc } from "ipc-sagas";

import commandSystem from "commands";

function* logIpc(foo, ipcResponse) {
  const { event, payload } = ipcResponse;
  console.log(payload);
}

export default function* rootSaga() {
  const commandChannel = yield channel();
  const ipcResponseChannel = yield ipcChannel("ipc-saga");

  yield [
    fork(watchKeyboard, commandChannel),
    fork(commandSystem, commandChannel),
    fork(takeEveryIpc, ipcResponseChannel, logIpc, "foobar"),
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
