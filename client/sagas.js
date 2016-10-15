import { v4 as uuid } from "uuid";
import { takeEvery, channel } from "redux-saga";
import { put, fork, call } from "redux-saga/effects";

import { watchKeyboard } from "features/input/sagas";
import { initTilesets } from "features/tilesets/sagas";
import {
  actionToIpc,
  ipcToAction
} from "features/ipc/sagas";

import {
  commandSystem
} from "features/commands/sagas";

export default function* rootSaga() {
  const commandChannel = yield call(channel);

  yield [
    fork(watchKeyboard, commandChannel),
    fork(commandSystem, commandChannel),
    fork(takeEvery, "IPC_REQUEST", actionToIpc),
    fork(ipcToAction, "IPC_RESPONSE")
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
