import { v4 as uuid } from "uuid";
import { takeEvery, channel } from "redux-saga";
import { take, put, fork, call } from "redux-saga/effects";

import { watchKeyboard } from "features/input/sagas";
import { renderingSystem, resetCameraSystem } from "features/rendering/sagas";
import { initTilesets, tilesetLoader } from "features/tilesets/sagas";
import {
  actionToIpc,
  ipcToAction,
} from "features/ipc/sagas";

export default function* rootSaga(context2d) {
  const inputSource = yield call(channel);

  const renderingSink = yield call(channel);
  yield [
    fork(watchKeyboard, inputSource),
    fork(resetCameraSystem),
    fork(takeEvery, "IPC_REQUEST", actionToIpc),
    fork(ipcToAction, "IPC_RESPONSE")
  ];

  yield put({ type: "SPAWN_ENTITY", payload: {
    uuid: uuid(),
    player: true,
    position: { x: 4, y: 4 },
    tileName: "player",
  }});

  yield call(initTilesets);
  yield put({ type: "START_RENDERING" });

  yield fork(function* () {
    while (true) {
      const command = yield take(inputSource);
      yield put(command);
    }
  });
}
